import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CountriesEffects } from './+state/countries.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCountries from './+state/countries.reducer';
import { CountriesFacade } from './+state/countries.facade';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCountries.COUNTRIES_FEATURE_KEY,
      fromCountries.reducer
    ),
    EffectsModule.forFeature([CountriesEffects]),
    HttpClientModule
  ],
  providers: [ CountriesFacade]
})
export class DataAccessCountriesModule { }
