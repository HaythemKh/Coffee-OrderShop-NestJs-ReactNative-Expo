export class CoffeeItem {

    readonly _id? : string;
    readonly Name? : string;
    readonly Description? : string;
    readonly SmallSizeVolume? : string;
    readonly SmallSizePrice? :  number;
    readonly MediumSizeVolume? : string;
    readonly MediumSizePrice? : number;
    readonly LargeSizeVolume? : string;
    readonly LargeSizePrice? : number;
    readonly Stars? : string;
    readonly Image? : string;

    constructor(data : any){
        this._id = data._id;
        this.Name = data.Name;
        this.Description = data.Description;

        this.SmallSizeVolume = data.SmallSizeVolume;
        this.SmallSizePrice = data.SmallSizePrice; 

        this.MediumSizeVolume = data.MediumSizeVolume;
        this.MediumSizePrice = data.MediumSizePrice; 

        this.LargeSizeVolume = data.LargeSizeVolume;
        this.LargeSizePrice = data.LargeSizePrice; 
        
        this.Stars = data.Stars;
        this.Image = data.Image;   
    }
}
