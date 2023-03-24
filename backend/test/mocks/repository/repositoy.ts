type byId = {
  id: string;
};

export class RepositorySpy<T> {
  public items: T[] = [];
  public input: any;
  public async loadAll() {
    return this.items;
  }

  public async loadById(id: string) {
    this.input = id;
    const allItems = this.items as unknown as byId[];
    const item = allItems.filter((i) => i.id === id);
    if (item.length === 0) return null;
    return item;
  }

  public async create(item: T) {
    this.input = item
    this.items = [...this.items, item];
    return item;
  }

  public async remove(id: string){
    this.input = id
    const allItems = this.items as unknown as byId[];
    const itemIndex = allItems.findIndex((item)=> item.id = id);
    if(itemIndex){
      this.items.splice(itemIndex, 1);
    }    
  }

  public update(data: T){
    this.input = data;
    const allItems = this.items as unknown as byId[];
    const byIdData = data as byId 
    const itemIndex = allItems.findIndex((item)=> item.id = byIdData.id);
    this.items[itemIndex] = data;
  }
}
