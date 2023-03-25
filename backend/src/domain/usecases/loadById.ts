export interface ILoadByIdUsecase<T>{
    loadById: (id: string)=> Promise<T | null>
}