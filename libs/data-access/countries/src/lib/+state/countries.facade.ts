import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromUsers from './countries.reducer';
import * as UsersSelectors from './countries.selectors';
import { CountriesEntity } from './countries.models';
import { loadUser, loadUsers } from './countries.actions';

@Injectable()
export class UsersFacade {
    loading$ = this.store.pipe(select(UsersSelectors.getLoadingState));
    allUsers$ = this.store.pipe(select(UsersSelectors.getAllUsers));
    currentPage$ = this.store.pipe(select(UsersSelectors.getCurrentPage));
    totalItems$ = this.store.pipe(select(UsersSelectors.getTotalItems));
    currentUser$ = this.store.pipe(select(UsersSelectors.selectCurrentUser));
    constructor(private store: Store<fromUsers.UsersPartialState>) {
    }

    getUsers(page: number, pageSize: number) {
        this.store.dispatch(loadUsers({
            pageSize: pageSize,
            pageNumber: page
        }));
    }

    getUser(userId: number | string) {
        this.store.dispatch(loadUser({
            userId
        }))
    }

}
