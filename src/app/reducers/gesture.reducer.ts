import { Action } from '@ngrx/store';
import { Gesture } from '../models/gesture.model';
import { Resource } from '../models/base.model';

export const LOAD_GESTURES = 'LOAD_GESTURES';
export const AFTER_LOAD_GESTURES = 'AFTER_LOAD_GESTURES';
export const CREATE_GESTURE = 'CREATE_GESTURE';

export function gesturesReducer(state: Resource<Gesture> = {
                                  loading: false,
                                  error: null,
                                  data: [],
                                }, action: Action): Resource<Gesture> {
  switch (action.type) {
    case LOAD_GESTURES:
      return Object.assign(state, { loading: true });

    case AFTER_LOAD_GESTURES:
      return {
        loading: false,
        error: null,
        data: action.payload
      };

    case CREATE_GESTURE:
      return Object.assign({}, {
        loading: false,
        error: null,
        data: [...state.data, action.payload],
      });

    default:
      return state;
  }
}
