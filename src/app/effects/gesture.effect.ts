import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { LOAD_GESTURES, AFTER_LOAD_GESTURES, CREATE_GESTURE, AFTER_CREATE_GESTURE } from '../reducers/gesture.reducer';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

const GESTURES_ENDPOINT = '/gesture';

@Injectable()
export class GesturesEffect {

  @Effect() getGesture: Observable<Action> = this.actions
    .ofType(LOAD_GESTURES)
    .switchMap((action) => this.http.get(environment.apiUrl + GESTURES_ENDPOINT)
      .map(res => ({
        type: AFTER_LOAD_GESTURES,
        payload: res.json().gestures,
      })),
    );

  @Effect() createGesture: Observable<Action> = this.actions
    .ofType(CREATE_GESTURE)
    .switchMap((action) => this.http.post(environment.apiUrl + GESTURES_ENDPOINT, action.payload)
      .map(res => ({
        type: AFTER_CREATE_GESTURE,
        payload: res.json(),
      })));

  constructor(private actions: Actions, private http: Http) {
  }
}
