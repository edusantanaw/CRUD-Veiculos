export interface IDeleteUsecase {
  delete: (id: string) => Promise<boolean>;
}
