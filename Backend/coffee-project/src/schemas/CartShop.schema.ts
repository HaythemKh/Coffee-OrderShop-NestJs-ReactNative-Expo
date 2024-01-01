
import { SchemaFactory,Prop,Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CartDocument = cartShop & Document;

@Schema({ collection: 'cartShop' })
export class cartShop{

@Prop({required : true})
CoffeeId : string;

@Prop({required : true})
UserId : string;

@Prop({ required: true })
Size: string;

@Prop({ required: true })
Price : number;

@Prop({ required: true })
Quantity : number;

}

export const cartShopSchema = SchemaFactory.createForClass(cartShop);