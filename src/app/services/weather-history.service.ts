import { HttpClient } from '@angular/common/http';
import { DOCUMENT, inject, Injectable } from '@angular/core';
import {
  WeatherHistoryDataParams,
  WeatherHistoryDownloadDataParams,
  WeatherHistoryResponse,
} from '@interfaces/weather-history';
import { todayYYYYMMDD } from '@utils/today';
import { Observable } from 'rxjs';

// Define the weather variables to be requested from Open-Meteo API. For more information, see: https://open-meteo.com/en/docs?timezone=auto#daily_weather_variables
const WEATHER_VARIABLES_DAILY = [
  'temperature_2m_min',
  'temperature_2m_max',
  'temperature_2m_mean',
  'relative_humidity_2m_mean',
  'wind_speed_10m_mean',
] as const;

@Injectable({
  providedIn: 'root',
})
export class WeatherHistoryService {
  private readonly _http = inject(HttpClient);
  private readonly _document = inject(DOCUMENT);

  private readonly _baseUrl = 'https://archive-api.open-meteo.com/v1/era5';

  // Attempt to cache year-based history data to avoid multiple http requests of the same year
  private _yearHistoryCache: Record<string, string> = {};

  /**
   * Get weather history data from Open-Meteo API based on latitude, longitude, start date and end date
   * @param params {@link WeatherHistoryDataParams}
   * @returns Weather history data response from Open-Meteo API
   */
  getWeatherHistoryData(params: WeatherHistoryDataParams): Observable<WeatherHistoryResponse> {
    return this._http.get<WeatherHistoryResponse>(this._baseUrl, {
      params: {
        ...params,
        daily: WEATHER_VARIABLES_DAILY,
        timezone: 'auto',
      },
    });
  }

  /**
   * Download weather history data for a specific year as a JSON file
   * @param params {@link WeatherHistoryDownloadDataParams}
   */
  downloadYearHistoryData(params: WeatherHistoryDownloadDataParams): void {
    const { latitude, longitude, year } = params;

    // Check if results for the selected year is already cached
    const cachedHistoryData = this._yearHistoryCache[year];

    if (cachedHistoryData) {
      // Download from cache without doing another HTTP request
      this._downloadJson(year, cachedHistoryData);
      return;
    }

    const currentYear = new Date().getFullYear().toString();
    const startDate = `${year}-01-01`;
    // If year param is the current year, set end_date to current day
    const endDate = year === currentYear ? todayYYYYMMDD() : `${year}-12-31`;

    this.getWeatherHistoryData({ latitude, longitude, start_date: startDate, end_date: endDate }).subscribe((data) => {
      const stringified = JSON.stringify(data);
      // Store results in cache
      this._yearHistoryCache = {
        ...this._yearHistoryCache,
        [year]: stringified,
      };
      this._downloadJson(year, stringified);
    });
  }

  /**
   * Download JSON data as a file
   * @param year the year of the weather history data
   * @param data the stringified data to be converted in json and downloaded
   */
  private _downloadJson(year: string, data: string): void {
    // Data URIs can break for large payloads and are less memory-friendly. Blob + createObjectURL is more a more robust approach
    const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const download = this._document.createElement('a');
    download.setAttribute('href', url);
    download.setAttribute('download', `${year}_weather_history_data.json`);
    this._document.body.appendChild(download);
    download.click();
    download.remove();

    // Cleanup
    URL.revokeObjectURL(url);
  }
}
