import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GeocodingCoordinates, GeocodingDataParams, GeocodingDataResponse } from '@interfaces/geocoding';
import { map, Observable } from 'rxjs';

const OPENCAGE_API_KEY = 'b65203b8e8d948d1974cd46c861c3cf2';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private readonly _http = inject(HttpClient);

  private readonly _baseUrl = 'https://api.opencagedata.com/geocode/v1/json';

  /**
   * Get geocoding data from OpenCage API based on address, city and country code
   * @param params {@link GeocodingDataParams}
   * @returns Geocoding data response from OpenCage API
   */
  getGeocodingDataFromAddress(params: GeocodingDataParams): Observable<GeocodingDataResponse> {
    const { address, city, countrycode } = params;

    return this._http.get<GeocodingDataResponse>(this._baseUrl, {
      params: {
        q: `${address}, ${city}`,
        countrycode,
        key: OPENCAGE_API_KEY,
      },
    });
  }

  /**
   * Get geocoding coordinates from OpenCage API based on address, city and country code
   * @param params {@link GeocodingDataParams}
   * @returns Geocoding coordinates or null if no results were found
   */
  getCoordinatesFromAddress(params: GeocodingDataParams): Observable<GeocodingCoordinates | null> {
    return this.getGeocodingDataFromAddress(params).pipe(
      // OpenCage results are ranked from most relevant to least, so we get the first element from the result array. For more information, check https://opencagedata.com/api#ranking
      map(({ results }) => results[0]?.geometry ?? null),
    );
  }
}
