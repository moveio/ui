import { Gesture } from './gesture.model';

export interface Pipeline {
  id: string;
  user_id?: string;
  name?: string;
  description?: string;
  timeout?: number;
  hook_id?: string;
  gesture?: Gesture;
  next?: Pipeline[];
}
