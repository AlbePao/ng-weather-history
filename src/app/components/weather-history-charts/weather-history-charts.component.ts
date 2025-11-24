import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChartHumidityHistoryComponent } from '@components/chart-humidity-history';
import { ChartTemperaturesHistoryComponent } from '@components/chart-temperatures-history';
import { ChartWindSpeedHistoryComponent } from '@components/chart-wind-speed-history';
import { WeatherHistoryResponse } from '@interfaces/weather-history';

@Component({
  selector: 'app-weather-history-charts',
  imports: [ChartTemperaturesHistoryComponent, ChartHumidityHistoryComponent, ChartWindSpeedHistoryComponent],
  templateUrl: './weather-history-charts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherHistoryChartsComponent {
  weatherHistoryData = input<WeatherHistoryResponse>();

  units = computed(() => this.weatherHistoryData()?.daily_units);
  weatherData = computed(() => this.weatherHistoryData()?.daily);
}
