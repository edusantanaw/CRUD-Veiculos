export interface ILoadAllUsecase<T> {
  load: () => Promise<T[] | null>;
}
