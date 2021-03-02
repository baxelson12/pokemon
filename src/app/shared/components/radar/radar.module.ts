import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadarComponent } from './radar.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [RadarComponent],
  imports: [CommonModule, ChartsModule],
  exports: [RadarComponent]
})
export class BadRadarModule {}
