export interface IValidator<T> {
  isValid: (value: T) => boolean;
}

export interface ISchemaValidator<T> {
  isValid: (data: T) => { message: string } | null;
}
