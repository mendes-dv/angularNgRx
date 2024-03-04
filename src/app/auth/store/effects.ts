import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistentService } from '../../shared/services/persistent.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
  persistentService = inject(PersistentService)
) => {
  return actions$.pipe(
    ofType(authActions.register),
    switchMap(({ request }) => {
      return authService.register(request).pipe(
        map((currentUser: CurrentUserInterface) => {
          persistentService.set('accessToken', currentUser.token);
          return authActions.registerSuccess({ currentUser });
        }),
        catchError((err: HttpErrorResponse) => {
          return of(authActions.registerFailure({
            errors: err.error.errors
          }));
        })
      );

    })
  );
}, { functional: true });

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );

  }, { functional: true, dispatch: false }
);