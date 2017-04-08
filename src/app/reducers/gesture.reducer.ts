import { Action } from '@ngrx/store';
import { Gesture } from '../models';

export const LOAD_GESTURES = 'LOAD_GESTURES';
export const AFTER_LOAD_GESTURES = 'AFTER_LOAD_GESTURES';
export const CREATE_GESTURE = 'CREATE_GESTURE';
export const AFTER_CREATE_GESTURE = 'AFTER_CREATE_GESTURE';

export function gesturesReducer(state: Gesture[] = [], action: Action): Gesture[] {
  switch (action.type) {
    case AFTER_LOAD_GESTURES:
      return action.payload;

    case AFTER_CREATE_GESTURE:
      return [...state, action.payload];

    default:
      return state;
  }
}
