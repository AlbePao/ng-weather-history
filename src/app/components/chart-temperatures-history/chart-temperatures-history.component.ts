import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartHistoryBaseComponent } from '@components/chart-history-base';
import { RadioOptionsComponent } from '@components/radio-options';
import { capitalizeFirstLetter } from '@utils/capitalize-first-letter';
import { setDataByTimeRange } from '@utils/groupDataByTimeRange';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-chart-temperatures-history',
  imports: [HighchartsChartComponent, RadioOptionsComponent, FormsModule],
  templateUrl: './chart-temperatures-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTemperaturesHistoryComponent extends ChartHistoryBaseComponent {
  override chartOptions = computed<Highcharts.Options>(() => {
    const weatherData = this.weatherData();
    const units = this.units();

    if (!weatherData || !units) {
      return { title: { text: 'Temperatures History' } };
    }

    const granularity = this.timeGranularity();
    const {
      time,
      temperature_2m_mean: meanTemperatures,
      temperature_2m_min: minTemperatures,
      temperature_2m_max: maxTemperatures,
    } = weatherData;

    const { groupedTime, groupedData: meanTemperatureData } = setDataByTimeRange(granularity, time, meanTemperatures);
    const { groupedData: minTemperatureData } = setDataByTimeRange(granularity, time, minTemperatures);
    const { groupedData: maxTemperatureData } = setDataByTimeRange(granularity, time, maxTemperatures);

    const formattedTime = groupedTime.map((value) => capitalizeFirstLetter(value.replaceAll('_', ' ')));

    return {
      title: { text: 'Temperatures History' },
      xAxis: {
        title: { text: 'Date' },
        labels: { rotation: -45 },
        categories: formattedTime,
      },
      yAxis: {
        title: { text: `Temperature ${units.temperature_2m_mean}` },
      },
      series: [
        {
          // Mean temperature data
          name: `Mean Temperature ${units.temperature_2m_mean}`,
          color: '#d08700',
          data: meanTemperatureData,
          type: 'line',
        },
        {
          // Min temperature data
          name: `Min Temperature ${units.temperature_2m_min}`,
          color: '#155dfc',
          data: minTemperatureData,
          type: 'line',
        },
        {
          // Max temperature data
          name: `Max Temperature ${units.temperature_2m_max}`,
          color: '#9f0712',
          data: maxTemperatureData,
          type: 'line',
        },
      ],
    };
  });
}
