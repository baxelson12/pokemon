import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { BadModalModule } from 'src/app/shared/components/modal/modal.module';
import { BadCardModule } from 'src/app/shared/components/card/card.module';
import { BadRadarModule } from 'src/app/shared/components/radar/radar.module';
import { BadButtonModule } from 'src/app/shared/components/button/button.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    BadModalModule,
    BadCardModule,
    BadRadarModule,
    BadButtonModule,
    AngularSvgIconModule
  ]
})
export class DetailModule {}
