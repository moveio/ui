import { Action } from '@ngrx/store';
import { GestureModel } from '../models/gesture.model';
import { BaseModel } from '../models/base.model';

export const LOAD_GESTURES = 'LOAD_GESTURES';
export const CREATE_GESTURE = 'CREATE_GESTURE';

export function gesturesReducer(state: BaseModel<GestureModel> = {
                                  loading: false,
                                  error: null,
                                  data: [],
                                }, action: Action): BaseModel<GestureModel> {
  switch (action.type) {
    case LOAD_GESTURES:
      return action.payload;

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
