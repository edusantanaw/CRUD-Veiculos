
export interface IUpdateRepository<T> {
    loadById: (id: string) => Promise<T | null>;
    update: (data: T) => Promise<T>;
  }
  