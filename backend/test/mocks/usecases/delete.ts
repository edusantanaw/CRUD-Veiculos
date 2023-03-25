export class DeleteUsecaseSpy {
    public itemExists: boolean = true;
    public input: any;
    public async delete(id: string) {
      this.input = id;
      if (!this.itemExists) throw new Error("Não encontrado!");
      return true;
    }
  }
  