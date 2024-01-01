
import { SchemaFactory,Prop,Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CoffeeDocument = coffeeItem & Document;

@Schema({ collection: 'coffeeItem' })
export class coffeeItem{

@Prop({required : true, unique : true})
Name : string;

@Prop({ required: true })
Description: string;

@Prop({ required: true })
SmallSizeVolume : string;
@Prop({ required: true })
SmallSizePrice : number;

@Prop({ required: true })
MediumSizeVolume : string;
@Prop({ required: true })
MediumSizePrice : number;

@Prop({ required: true })
LargeSizeVolume : string;
@Prop({ required: true })
LargeSizePrice : number;

@Prop({required : true})
Stars : string;

@Prop({required : true})
Image : string;

}

export const coffeeItemSchema = SchemaFactory.createForClass(coffeeItem);