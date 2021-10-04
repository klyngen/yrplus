export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Units {
  air_pressure_at_sea_level: string;
  air_temperature: string;
  air_temperature_max: string;
  air_temperature_min: string;
  cloud_area_fraction: string;
  cloud_area_fraction_high: string;
  cloud_area_fraction_low: string;
  cloud_area_fraction_medium: string;
  dew_point_temperature: string;
  fog_area_fraction: string;
  precipitation_amount: string;
  relative_humidity: string;
  ultraviolet_index_clear_sky: string;
  wind_from_direction: string;
  wind_speed: string;
}

export interface Meta {
  updated_at: Date;
  units: Units;
}

export interface Details {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  air_temperature_percentile_10: number;
  air_temperature_percentile_90: number;
  cloud_area_fraction: number;
  cloud_area_fraction_high: number;
  cloud_area_fraction_low: number;
  cloud_area_fraction_medium: number;
  dew_point_temperature: number;
  fog_area_fraction: number;
  relative_humidity: number;
  ultraviolet_index_clear_sky: number;
  wind_from_direction: number;
  wind_speed: number;
  wind_speed_of_gust: number;
  wind_speed_percentile_10: number;
  wind_speed_percentile_90: number;
}

export interface Instant {
  details: Details;
}

export interface Summary {
  symbol_code: string;
}

export interface Next12Hours {
  summary: Summary;
}

export interface Summary2 {
  symbol_code: string;
}

export interface Details2 {
  precipitation_amount: number;
}

export interface Next1Hours {
  summary: Summary2;
  details: Details2;
}

export interface Summary3 {
  symbol_code: string;
}

export interface Details3 {
  air_temperature_max: number;
  air_temperature_min: number;
  precipitation_amount: number;
}

export interface Next6Hours {
  summary: Summary3;
  details: Details3;
}

export interface Data {
  instant: Instant;
  next_12_hours: Next12Hours;
  next_1_hours: Next1Hours;
  next_6_hours: Next6Hours;
}

export interface Timesery {
  time: string;
  data: Data;
}

export interface Properties {
  meta: Meta;
  timeseries: Timesery[];
}

export interface WeatherResponse {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

// KARTVERKET API-TYPER
export interface Metadata {
  treffPerSide: number;
  side: number;
  totaltAntallTreff: number;
  viserFra: number;
  viserTil: number;
  sokeStreng: string;
}

export interface Representasjonspunkt {
  øst: number;
  nord: number;
  koordsys: number;
}

export interface Fylker {
  fylkesnavn: string;
  fylkesnummer: string;
}

export interface Kommuner {
  kommunenummer: string;
  kommunenavn: string;
}

export interface Location {
  skrivemåte: string;
  skrivemåtestatus: string;
  navnestatus: string;
  språk: string;
  navneobjekttype: string;
  stedsnummer: number;
  stedstatus: string;
  representasjonspunkt: Representasjonspunkt;
  fylker: Fylker[];
  kommuner: Kommuner[];
}

export interface LocationResponse {
  metadata: Metadata;
  navn: Location[];
}
