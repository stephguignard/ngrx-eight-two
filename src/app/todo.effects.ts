import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as TodoActions from './todo.actions';
import { Action } from '@ngrx/store';
import ToDo from './todo.model';

@Injectable()
export class TodoEffects {
  private ApiURL = 'https://localhost:44308/api/ToDo';

  constructor(private actions$: Actions, private http: HttpClient) {}

  GetToDos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.BeginGetToDoAction),
      mergeMap(action =>
        this.http.get(this.ApiURL).pipe(
          map((data: ToDo[]) => {
            return TodoActions.SuccessGetToDoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(TodoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.BeginCreateToDoAction),
      mergeMap(action =>
        this.http
          .post(this.ApiURL, JSON.stringify(action.payload), {
            headers: { 'Content-Type': 'application/json' }
          })
          .pipe(
            map((data: ToDo) => {
              return TodoActions.SuccessCreateToDoAction({ payload: data });
            }),
            catchError((error: Error) => {
              return of(TodoActions.ErrorToDoAction(error));
            })
          )
      )
    )
  );
}
