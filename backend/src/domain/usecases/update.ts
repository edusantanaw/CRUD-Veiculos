export interface IUpdateUsecase<P, R> {
  update: (data: P) => Promise<R>;
}
