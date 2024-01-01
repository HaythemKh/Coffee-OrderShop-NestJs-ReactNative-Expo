export class Cart {
    readonly _id : string;
    readonly CoffeeId: string;
    readonly UserId : string;
    readonly Size: string;
    readonly Price: number;
    readonly Quantity: number;

    constructor(data : any)
    {
        this._id = data._id;
        this.CoffeeId = data.CoffeeId;
        this.UserId = data.UserId;
        this.Size = data.Size;
        this.Price = data.Price;
        this.Quantity = data.Quantity;
    }

}
