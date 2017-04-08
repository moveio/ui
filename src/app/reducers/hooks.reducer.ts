import { Action } from '@ngrx/store';
import { Hook } from '../models';

export const LOAD_HOOKS = 'LOAD_HOOKS';
export const AFTER_LOAD_HOOKS = 'AFTER_LOAD_HOOKS';
export const CREATE_HOOK = 'CREATE_HOOK';
export const AFTER_CREATE_HOOK = 'AFTER_CREATE_HOOK';

export function hooksReducer(state: Hook[] = [], action: Action): Hook[] {
  switch (action.type) {
    case AFTER_LOAD_HOOKS:
      return action.payload;

    case AFTER_CREATE_HOOK:
      return [...state, action.payload];

    default:
      return state;
  }
}
