import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ParamSerializer } from './store/serializers/param.serializer';
import { storeFreeze } from 'ngrx-store-freeze';

import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './core/services/data.service';
import { ToolbarModule } from './core/components/toolbar/toolbar.module';
import { BadNavModule } from './shared/components/nav/nav.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PokemonModule } from './core/components/pokemon/pokemon.module';
import { BadModalModule } from './shared/components/modal/modal.module';
import { BadRadarModule } from './shared/components/radar/radar.module';

export const metaReducers: MetaReducer<{}>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      serializer: ParamSerializer
    }),
    HttpClientModule,
    ToolbarModule,
    BadNavModule,
    AngularSvgIconModule.forRoot(),
    PokemonModule,
    BadModalModule,
    BadRadarModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
