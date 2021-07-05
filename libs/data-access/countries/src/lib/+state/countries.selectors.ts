import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import {
  COUNTRIES_FEATURE_KEY,
  State,
  UsersPartialState,
  usersAdapter
} from './countries.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<UsersPartialState, State>(
    COUNTRIES_FEATURE_KEY
);
export const selectRouter = createFeatureSelector<RouterReducerState>('router') ;

const { selectAll, selectEntities } = usersAdapter.getSelectors();
const { selectRouteParam } = getSelectors(selectRouter);

export const getLoadingState = createSelector(
  getUsersState,
  (state: State) => state.loading
);

export const getTotalItems = createSelector(
  getUsersState,
  (state: State) => state.totalItems
);
export const getCurrentPage = createSelector(
  getUsersState,
  (state: State) => state.currentPage
);
export const getUsersError = createSelector(
  getUsersState,
  (state: State) => state.error
);

export const getAllUsers = createSelector(getUsersState, (state: State) =>
  selectAll(state)
);

const getEntities = createSelector(getUsersState, (state) => selectEntities(state));

const selectCurrentUserId = selectRouteParam('userId');

export const selectCurrentUser = createSelector(
  selectCurrentUserId,
  getEntities,
  (userId, entities) => !userId ? undefined : entities[userId]
);
