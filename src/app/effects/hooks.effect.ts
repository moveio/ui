import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { AFTER_CREATE_HOOK, AFTER_LOAD_HOOKS, CREATE_HOOK, LOAD_HOOKS } from '../reducers/hooks.reducer';

const HOOKS_ENDPOINT = '/hook';

@Injectable()
export class HooksEffect {

  @Effect() getHook: Observable<Action> = this.actions
    .ofType(LOAD_HOOKS)
    .switchMap((action) => this.http.get(environment.apiUrl + HOOKS_ENDPOINT)
      .map(res => ({
        type: AFTER_LOAD_HOOKS,
        payload: res.json().hooks,
      })),
    );

  @Effect() createHook: Observable<Action> = this.actions
    .ofType(CREATE_HOOK)
    .switchMap((action) => this.http.post(environment.apiUrl + HOOKS_ENDPOINT, action.payload)
      .map(res => ({
        type: AFTER_CREATE_HOOK,
        payload: res.json(),
      })));

  constructor(private actions: Actions, private http: Http) {
  }
}
