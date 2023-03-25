type byId = {
  id: string;
};

export class RepositorySpy<T extends byId> {
  public items: T[] = [];
  public input: any;
  public async loadAll() {
    return this.items;
  }

  public async loadById(id: string) {
    this.input = id;
    const item = this.items.filter((i) => i.id === id);
    if (item.length === 0) return null;
    return item[0];
  }

  public async create(item: T) {
    this.input = item;
    item.id = "any_id" // mock id
    this.items = [...this.items, item];
    return item;
  }

  public async remove(id: string) {
    this.input = id;
    const itemIndex = this.items.findIndex((item) => (item.id = id));
    if (itemIndex) {
      this.items.splice(itemIndex, 1);
    }
  }

  public update(data: T) {
    this.input = data;
    const byIdData = data as byId;
    const itemIndex = this.items.findIndex((item) => (item.id = byIdData.id));
    this.items[itemIndex] = data;
  }
}
