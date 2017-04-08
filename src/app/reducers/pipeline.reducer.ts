import { Action } from '@ngrx/store';
import { Pipeline } from '../models';

export const LOAD_PIPELINES = 'LOAD_PIPELINES';
export const AFTER_LOAD_PIPELINES = 'AFTER_LOAD_PIPELINES';
export const CREATE_PIPELINE = 'CREATE_PIPELINE';
export const AFTER_CREATE_PIPELINE = 'AFTER_CREATE_PIPELINE';

export function pipelineReducer(state: Pipeline[] = [], action: Action): Pipeline[] {
  switch (action.type) {
    case AFTER_LOAD_PIPELINES:
      return action.payload;

    case AFTER_CREATE_PIPELINE:
      return [...state, action.payload];

    default:
      return state;
  }
}
