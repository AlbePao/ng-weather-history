import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartHistoryBaseComponent } from '@components/chart-history-base';
import { RadioOptionsComponent } from '@components/radio-options';
import { capitalizeFirstLetter } from '@utils/capitalize-first-letter';
import { setDataByTimeRange } from '@utils/groupDataByTimeRange';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-chart-wind-speed-history',
  imports: [HighchartsChartComponent, RadioOptionsComponent, FormsModule],
  templateUrl: './chart-wind-speed-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartWindSpeedHistoryComponent extends ChartHistoryBaseComponent {
  override chartOptions = computed<Highcharts.Options>(() => {
    const weatherData = this.weatherData();
    const units = this.units();

    if (!weatherData || !units) {
      return { title: { text: 'Wind Speed History' } };
    }

    const granularity = this.timeGranularity();
    const { time, wind_speed_10m_mean: meanWindSpeed } = weatherData;

    const { groupedTime, groupedData: meanWindSpeedData } = setDataByTimeRange(granularity, time, meanWindSpeed);

    const formattedTime = groupedTime.map((value) => capitalizeFirstLetter(value.replaceAll('_', ' ')));

    return {
      title: { text: 'Wind Speed History' },
      xAxis: {
        title: { text: 'Date' },
        labels: { rotation: -45 },
        categories: formattedTime,
      },
      yAxis: {
        title: { text: `Wind Speed (${units.wind_speed_10m_mean})` },
      },
      series: [
        {
          // Wind speed data
          color: '#00a63e',
          data: meanWindSpeedData,
          type: 'line',
          showInLegend: false,
        },
      ],
    };
  });
}
