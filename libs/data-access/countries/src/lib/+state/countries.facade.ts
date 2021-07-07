import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as fromCountries from './countries.reducer';
import * as CountriesSelectors from './countries.selectors';
import { loadCountries } from './countries.actions';

@Injectable()
export class CountriesFacade {
    loading$ = this.store.pipe(select(CountriesSelectors.getLoadingState));
    allCountries$ = this.store.pipe(select(CountriesSelectors.getAllCountries));
    currentPage$ = this.store.pipe(select(CountriesSelectors.getCurrentPage));
    totalItems$ = this.store.pipe(select(CountriesSelectors.getTotalItems));
    currentUser$ = this.store.pipe(select(CountriesSelectors.selectCurrentUser));
    constructor(private store: Store<fromCountries.CountriesPartialState>) {
    }

    getCountries() {
        this.store.dispatch(loadCountries());
    }

}
