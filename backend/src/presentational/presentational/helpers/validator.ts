export interface IValidator<T> {
    isValid: (value: T) => boolean;
  }