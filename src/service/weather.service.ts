import { Observable, ReplaySubject, Subject } from "rxjs";
import { filter, groupBy, map, mergeMap, toArray } from "rxjs/operators";
import {
  DAY,
  HttpClient,
  httpClient,
  WeatherData,
  WeatherSnapshot,
} from "./httpClient";
import locationService, { LocationService } from "./location.service";

export class WeatherService {
  constructor(
    private httpClient: HttpClient,
    private locationService: LocationService
  ) {
    this.locationService.asObservable.subscribe((location) => {
      this.getWeatherData(
        location.representasjonspunkt.nord,
        location.representasjonspunkt.øst
      ).subscribe((weatherData) => this.weatherSubject.next(weatherData));
    });

  }

  private weatherSubject: ReplaySubject<WeatherData[]> = new ReplaySubject(1);

  get observable(): Observable<WeatherData[]> {
    return this.weatherSubject.asObservable();
  }

  private getWeatherData(lat: number, lon: number): Observable<WeatherData[]> {
    return this.httpClient.getWeatherData(lat, lon).pipe(
      mergeMap((item) => item.properties.timeseries),
      filter((item) => item.data.next_1_hours !== undefined),
      map((weather) => ({
        time: new Date(weather.time),
        wind: weather.data.instant.details.wind_speed,
        temperature: weather.data.instant.details.air_temperature,
        weather_icon: weather.data.next_1_hours.summary.symbol_code,
        direction: weather.data.instant.details.wind_from_direction,
        preassure: weather.data.instant.details.air_pressure_at_sea_level,
        gust: weather.data.instant.details.wind_speed_of_gust,
        humidity: weather.data.instant.details.relative_humidity,
        dewpoint: weather.data.instant.details.dew_point_temperature,
      })),
      toArray(),
      mergeMap((item) => item),
      groupBy((item) => item.time.getUTCDay()),
      mergeMap((group) => group.pipe(toArray())),
      map<WeatherSnapshot[], WeatherData>((item) => ({
        summary: {
          averagePreassure: Math.floor(
            item
              .map((x) => x.preassure)
              .reduce((previous, current) => previous + current) / item.length
          ),
          averageWindDirection: Math.floor(
            item
              .map((x) => x.direction)
              .reduce((previous, current) => previous + current) / item.length
          ),
          highestTemperature: item
            .map((item) => item.temperature)
            .reduce((a, b) => Math.max(a, b)),
          lowestTemperature: item
            .map((item) => item.temperature)
            .reduce((a, b) => Math.min(a, b)),
          averageWindSpeed: this.round(
            item.map((item) => item.wind).reduce((a, b) => a + b) / item.length,
            1
          ),
          averageGustSpeed: this.round(
            item.map((item) => item.wind).reduce((a, b) => a + b) / item.length,
            1
          ),
          averageHumidity: this.round(
            item.map((item) => item.humidity).reduce((a, b) => a + b) /
            item.length,
            1
          ),
          averageDewpoint: this.round(
            item.map((item) => item.dewpoint).reduce((a, b) => a + b) /
            item.length,
            1
          ),
        },
        snapshots: item,
        day: Object.values(DAY)[item[0].time.getUTCDay()],
      })),
      toArray()
    );
  }

  private round(x: number, digits: number): number {
    return Number.parseFloat(x.toFixed(digits));
  }
}

export default new WeatherService(httpClient, locationService);
