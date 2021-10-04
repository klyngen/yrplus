import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { LocationResponse, WeatherResponse } from "./interfaces";

export interface WeatherSnapshot {
  time: Date;
  wind: number;
  gust: number;
  direction: number;
  weather_icon: string;
  temperature: number;
  preassure: number;
  humidity: number;
  dewpoint: number;
}

export interface WeatherSummary {
  averageWindSpeed: number;
  averagePreassure: number;
  averageWindDirection: number;
  lowestTemperature: number;
  highestTemperature: number;
  averageGustSpeed: number;
  averageHumidity: number;
  averageDewpoint: number;
}

export enum DAY {
  SUNDAY = "Sunday",
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
}

export interface WeatherData {
  day: DAY;
  snapshots: WeatherSnapshot[];
  summary: WeatherSummary;
}

export class HttpClient {
  getWeatherData(lat: number, lon: number): Observable<WeatherResponse> {
    return ajax<WeatherResponse>({
      url: `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`,
      method: "GET",
      crossDomain: true,
    }).pipe(map((response) => response.response));
  }

  locationSearch(
    text: string,
    pageSize: number,
    page: number
  ): Observable<LocationResponse> {
    return ajax<LocationResponse>({
      url: `https://ws.geonorge.no/stedsnavn/v1/navn?sok=${text}&fuzzy=true&utkoordsys=4258&treffPerSide=${pageSize}&side=${
        page + 1
      }`,
      crossDomain: true,
      method: "GET",
    }).pipe(map((item) => item.response));
  }
}

export const httpClient = new HttpClient();
