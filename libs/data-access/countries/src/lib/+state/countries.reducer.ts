import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CountriesActions from './countries.actions';
import { CountriesEntity } from './countries.models';

export const COUNTRIES_FEATURE_KEY = 'countries';

export interface State extends EntityState<CountriesEntity> {
  loading: boolean;
  error?: string | null; // last known error (if any)
  currentPage: number;
  totalItems: number;
}

export interface CountriesPartialState {
  readonly [COUNTRIES_FEATURE_KEY]: State;
}

export const countriesAdapter: EntityAdapter<CountriesEntity> = createEntityAdapter<CountriesEntity>({
  selectId: u => u.code
});

export const initialState: State = countriesAdapter.getInitialState({
  // set initial required properties
  loading: false,
  currentPage: 1,
  totalItems: 0
});

const CountriesReducer = createReducer(
  initialState,
  on(CountriesActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CountriesActions.loadCountriesSuccess, (state, { countries }) =>
  countriesAdapter.setAll({
    
  })
  ),
  on(CountriesActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return countriesReducer(state, action);
}
