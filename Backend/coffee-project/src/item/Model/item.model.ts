
export class Item {
    readonly Name? : string;
    readonly Price? : number;
    readonly Category? : string;

    constructor(itemData : any){
        this.Name = itemData.Name;
        this.Price = itemData.Price;
        this.Category = itemData.Category;
    }

}