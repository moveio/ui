
export interface Resource<T> {
  loading: boolean;
  error: any;
  data: T[];
}
