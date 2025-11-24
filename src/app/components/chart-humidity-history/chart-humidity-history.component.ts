import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartHistoryBaseComponent } from '@components/chart-history-base';
import { RadioOptionsComponent } from '@components/radio-options';
import { capitalizeFirstLetter } from '@utils/capitalize-first-letter';
import { setDataByTimeRange } from '@utils/groupDataByTimeRange';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-chart-humidity-history',
  imports: [HighchartsChartComponent, RadioOptionsComponent, FormsModule],
  templateUrl: './chart-humidity-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartHumidityHistoryComponent extends ChartHistoryBaseComponent {
  override chartOptions = computed<Highcharts.Options>(() => {
    const weatherData = this.weatherData();
    const units = this.units();

    if (!weatherData || !units) {
      return { title: { text: 'Humidity History' } };
    }

    const granularity = this.timeGranularity();
    const { time, relative_humidity_2m_mean: meanHumidity } = weatherData;

    const { groupedTime, groupedData: meanHumidityData } = setDataByTimeRange(granularity, time, meanHumidity);

    const formattedTime = groupedTime.map((value) => capitalizeFirstLetter(value.replaceAll('_', ' ')));

    return {
      title: { text: 'Humidity History' },
      xAxis: {
        title: { text: 'Date' },
        labels: { rotation: -45 },
        categories: formattedTime,
      },
      yAxis: {
        title: { text: `Humidity (${units.relative_humidity_2m_mean})` },
      },
      series: [
        {
          // Humidity data
          color: '#0092b8',
          data: meanHumidityData,
          type: 'line',
          showInLegend: false,
        },
      ],
    };
  });
}
