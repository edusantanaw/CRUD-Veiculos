
export interface ICreateUsecase<T, R> {
    create: (data: T) => Promise<R>
}