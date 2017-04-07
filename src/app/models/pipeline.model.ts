import { GestureModel } from './gesture.model';

export interface PipelineModel {
  id: string;
  user_id?: string;
  name?: string;
  description?: string;
  timeout?: number;
  hook_id?: string;
  gesture?: GestureModel;
  next?: PipelineModel[];
}
