import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { LOAD_GESTURES } from '../reducers/gesture.reducer';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

const GESTURES_ENDPOINT = '/gesture';

@Injectable()
export class GesturesEffect {

  @Effect() getGesture: Observable<Action> = this.actions
    .ofType(LOAD_GESTURES)
    .switchMap((action) => this.http.get(environment.apiUrl + GESTURES_ENDPOINT)
      .map(body => ({
        type: LOAD_GESTURES,
        payload: body.json(),
      })),
    );


  constructor(private actions: Actions, private http: Http) {
  }
}
