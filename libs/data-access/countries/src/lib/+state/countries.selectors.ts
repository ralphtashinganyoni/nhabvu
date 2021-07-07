import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import {
  COUNTRIES_FEATURE_KEY,
  State,
  CountriesPartialState,
  countriesAdapter
} from './countries.reducer';

// Lookup the 'Countries' feature state managed by NgRx
export const getCountriesState = createFeatureSelector<CountriesPartialState, State>(
    COUNTRIES_FEATURE_KEY
);
export const selectRouter = createFeatureSelector<RouterReducerState>('router') ;

const { selectAll, selectEntities } = countriesAdapter.getSelectors();
const { selectRouteParam } = getSelectors(selectRouter);

export const getLoadingState = createSelector(
  getCountriesState,
  (state: State) => state.loading
);

export const getTotalItems = createSelector(
  getCountriesState,
  (state: State) => state.totalItems
);
export const getCurrentPage = createSelector(
  getCountriesState,
  (state: State) => state.currentPage
);
export const getCountriesError = createSelector(
  getCountriesState,
  (state: State) => state.error
);

export const getAllCountries = createSelector(getCountriesState, (state: State) =>
  selectAll(state)
);

const getEntities = createSelector(getCountriesState, (state) => selectEntities(state));

const selectCurrentCode = selectRouteParam('countryCode');

export const selectCurrentUser = createSelector(
  selectCurrentCode,
  getEntities,
  (countryCode, entities) => !countryCode ? undefined : entities[countryCode]
);
