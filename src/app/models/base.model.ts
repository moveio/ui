
export interface BaseModel<T> {
  loading: boolean;
  error: any;
  data: T[];
}
