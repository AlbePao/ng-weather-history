export interface WeatherHistoryDataParams {
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string;
}

export interface WeatherHistoryDownloadDataParams {
  latitude: number;
  longitude: number;
  year: string;
}

export interface WeatherHistoryResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    temperature_2m_min: string;
    temperature_2m_max: string;
    temperature_2m_mean: string;
    relative_humidity_2m_mean: string;
    wind_speed_10m_mean: string;
  };
  daily: {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    temperature_2m_mean: number[];
    relative_humidity_2m_mean: number[];
    wind_speed_10m_mean: number[];
  };
}
