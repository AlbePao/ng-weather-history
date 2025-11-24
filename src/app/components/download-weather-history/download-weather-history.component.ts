import { ChangeDetectionStrategy, Component, effect, inject, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@components/button';
import { FormFieldModule } from '@components/form-field';
import { InputDirective } from '@components/input';
import { GeocodingCoordinates } from '@interfaces/geocoding';
import { WeatherHistoryService } from '@services/weather-history.service';
import { getYearsFromStartYear } from '@utils/getYearsFromStartYear';

// Open-Meteo collects historical weather data starting from 1940
const START_YEAR = 1940;

@Component({
  selector: 'app-download-weather-history',
  imports: [FormFieldModule, InputDirective, ButtonModule, FormsModule],
  templateUrl: './download-weather-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex gap-2 justify-end',
  },
})
export class DownloadWeatherHistoryComponent {
  private readonly _weatherHistoryService = inject(WeatherHistoryService);

  coordinates = input.required<GeocodingCoordinates | null>();
  currentYear = input.required<string | null>();

  selectedYear = model<string | null>(null);

  selectableYears = getYearsFromStartYear(START_YEAR);

  constructor() {
    // Initialize the selected year to the current year when available
    effect(() => {
      if (this.currentYear()) {
        this.selectedYear.set(this.currentYear());
      }
    });
  }

  download(): void {
    const coordinates = this.coordinates();
    const selectedYear = this.selectedYear();

    if (!selectedYear || !coordinates) {
      return;
    }

    this._weatherHistoryService.downloadYearHistoryData({
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      year: selectedYear,
    });
  }
}
