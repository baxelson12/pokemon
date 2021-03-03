import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'bad-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent {
  @Input() labels: Label[];
  @Input() data: ChartDataSets[];

  options: RadialChartOptions = {
    responsive: true,
    legend: { display: false },
    tooltips: { enabled: false },
    scale: {
      ticks: {
        min: 0
      }
    }
  };
  chartType: ChartType = 'radar';
}
