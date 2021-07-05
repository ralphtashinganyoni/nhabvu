import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CountriesActions from './countries.actions';
import { CountriesService } from '../services/countries.service';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  loadAllUsers$ = createEffect(() =>
  this.actions.pipe(
    ofType(CountriesActions.loadCountries),
    exhaustMap((action) =>
      this.CountriesService.getCoutries().pipe(
        map((countries) => CountriesActions.loadCountriesSuccess({ countries })),
        catchError((error) => { console.log(error);return of(CountriesActions.loadCountriesFailure({ error }))})
      )
    )
  )
);




constructor(
  private CountriesService: CountriesService,
  private actions: Actions
) {
}
}
