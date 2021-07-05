import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as UsersActions from './countries.actions';
import { CountriesEntity } from './countries.models';

export const COUNTRIES_FEATURE_KEY = 'countries';

export interface State extends EntityState<CountriesEntity> {
  loading: boolean;
  error?: string | null; // last known error (if any)
  currentPage: number;
  totalItems: number;
}

export interface UsersPartialState {
  readonly [COUNTRIES_FEATURE_KEY]: State;
}

export const usersAdapter: EntityAdapter<CountriesEntity> = createEntityAdapter<CountriesEntity>({
  selectId: u => u.id
});

export const initialState: State = usersAdapter.getInitialState({
  // set initial required properties
  loading: false,
  currentPage: 1,
  totalItems: 0
});

const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users.items, {
      ...state,
      currentPage: users.pageNumber,
      totalItems: users.totalItems,
      loading: false
    })
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
