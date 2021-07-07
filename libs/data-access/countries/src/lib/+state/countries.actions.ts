import { createAction, props } from '@ngrx/store';
import { CountriesEntity } from './countries.models';

export const loadCountries = createAction(
  '[Countries] Load Countries',
  );

export const loadCountriesSuccess = createAction(
  '[Countries] Load Countries Success',
  props<{ countries: CountriesEntity[] }>()
);

export const loadCountriesFailure = createAction(
  '[Countries] Load Countries Failure',
  props<{ error: any }>()
);
