import { HttpStatusCode } from '@angular/common/http';

export interface GeocodingDataParams {
  address: string;
  city: string;
  countrycode: string;
}

export interface GeocodingDataResponse {
  documentation: string;
  licenses: GeocodingDataLicence[];
  rate: {
    limit: number;
    remaining: number;
    reset: number;
  };
  results: GeocodingDataResult[];
  status: {
    code: HttpStatusCode;
    message: string;
  };
  timestamp: {
    created_http: string;
    created_unix: number;
  };
  total_results: number;
}

interface GeocodingDataResult {
  annotations: {
    DMS: {
      lat: string;
      lng: string;
    };
    MGRS: string;
    Maidenhead: string;
    Mercator: {
      x: number;
      y: number;
    };
    OSM: {
      edit_url: string;
      note_url: string;
      url: string;
    };
    UN_M49: {
      regions: Record<UNM49Regions, string>;
      statistical_groupings: string[];
    };
    callingcode: number;
    currency: {
      alternate_symbols: string[];
      decimal_mark: '';
      disambiguate_symbol: '';
      format: '';
      html_entity: '';
      iso_code: '';
      iso_numeric: '';
      name: '';
      smallest_denomination: number;
      subunit: '';
      subunit_to_unit: number;
      symbol: '';
      symbol_first: number;
      thousands_separator: '';
    };
    flag: '';
    geohash: string;
    qibla: number;
    roadinfo: {
      drive_on: 'left' | 'right';
      road: string;
      road_type: string;
      speed_in: 'km/h' | 'mph';
    };
    sun: {
      rise: {
        apparent: number;
        astronomical: number;
        civil: number;
        nautical: number;
      };
      set: {
        apparent: number;
        astronomical: number;
        civil: number;
        nautical: number;
      };
    };
    timezone: {
      name: string;
      now_in_dst: number;
      offset_sec: number;
      offset_string: string;
      short_name: string;
    };
    what3words: {
      words: string;
    };
  };
  bounds: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
  components: {
    'ISO_3166-1_alpha-2': string;
    'ISO_3166-1_alpha-3': string;
    'ISO_3166-2': string[];
    _category: string;
    _normalized_city: string;
    _type: string;
    city: string;
    continent: string;
    country: string;
    country_code: string;
    postcode: string;
    road: string;
    road_type: string;
    state: string;
    suburb: string;
  };
  confidence: number;
  distance_from_q: {
    meters: number;
  };
  formatted: string;
  geometry: GeocodingCoordinates;
}

export interface GeocodingCoordinates {
  lat: number;
  lng: number;
}

interface GeocodingDataLicence {
  name: string;
  url: string;
}

type UNM49Regions =
  | 'AFRICA'
  | 'AMERICAS'
  | 'ASIA'
  | 'AUSTRALASIA'
  | 'CARIBBEAN'
  | 'CENTRAL_AMERICA'
  | 'CENTRAL_ASIA'
  | 'CHANNEL_ISLANDS'
  | 'EASTERN_AFRICA'
  | 'EASTERN_ASIA'
  | 'EASTERN_EUROPE'
  | 'EUROPE'
  | 'LATIN_AMERICA'
  | 'MELANESIA'
  | 'MICRONESIAN_REGION'
  | 'MIDDLE_AFRICA'
  | 'NORTHERN_AFRICA'
  | 'NORTHERN_AMERICA'
  | 'NORTHERN_EUROPE'
  | 'NORTH_AMERICA'
  | 'OCEANIA'
  | 'POLYNESIA'
  | 'SOUTHEAST_ASIA'
  | 'SOUTHERN_AFRICA'
  | 'SOUTHERN_ASIA'
  | 'SOUTHERN_EUROPE'
  | 'SOUTH_AMERICA'
  | 'SUB-SAHARAN_AFRICA'
  | 'WESTERN_AFRICA'
  | 'WESTERN_ASIA'
  | 'WESTERN_EUROPE'
  | 'WORLD';
