export interface IEncoder {
  genHash: (password: string) => Promise<string>;
}

export interface IComparePass {
  compare: (pass: string, hashed: string) => Promise<boolean>;
}
