export class Command {
    readonly CoffeeName : string;
    readonly CoffeeSize : string;
    readonly CoffeeQuantity : number;
    readonly CoffeePrice : number;

    constructor(name : string, size : string, quantity : number, price : number) {
        this.CoffeeName = name;
        this.CoffeeSize = size;
        this.CoffeeQuantity = quantity;
        this.CoffeePrice = price;
    }
}
