import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { AFTER_CREATE_PIPELINE, AFTER_LOAD_PIPELINES, CREATE_PIPELINE, LOAD_PIPELINES } from '../reducers/pipeline.reducer';

const PIPELINES_ENDPOINT = '/pipeline';

@Injectable()
export class PipelinesEffect {

  @Effect() getPipeline: Observable<Action> = this.actions
    .ofType(LOAD_PIPELINES)
    .switchMap((action) => this.http.get(environment.apiUrl + PIPELINES_ENDPOINT)
      .map(res => ({
        type: AFTER_LOAD_PIPELINES,
        payload: res.json().pipelines,
      })),
    );

  @Effect() createPipeline: Observable<Action> = this.actions
    .ofType(CREATE_PIPELINE)
    .switchMap((action) => this.http.post(environment.apiUrl + PIPELINES_ENDPOINT, action.payload)
      .map(res => ({
        type: AFTER_CREATE_PIPELINE,
        payload: res.json(),
      })));

  constructor(private actions: Actions, private http: Http) {
  }
}
