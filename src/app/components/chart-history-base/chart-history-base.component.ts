import { Directive, effect, input, model, Signal } from '@angular/core';
import { TIME_GRANULARITY_RADIO_OPTIONS } from '@constants/time-granularity-radio-options';
import { TimeRangesGranularity } from '@interfaces/time-ranges-granularity';
import { WeatherHistoryDailyData, WeatherHistoryUnits } from '@interfaces/weather-history';

@Directive()
export class ChartHistoryBaseComponent {
  units = input<WeatherHistoryUnits>();
  weatherData = input<WeatherHistoryDailyData>();

  granularityRadioOptions = TIME_GRANULARITY_RADIO_OPTIONS;

  chartUpdate = model<boolean>(false);
  timeGranularity = model<TimeRangesGranularity>('daily');
  chartOptions!: Signal<Highcharts.Options>;

  constructor() {
    effect(() => {
      if (this.chartOptions()) {
        this.chartUpdate.set(true);
      }
    });
  }
}
