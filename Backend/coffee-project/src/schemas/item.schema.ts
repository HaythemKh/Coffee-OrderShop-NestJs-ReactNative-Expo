
import { SchemaFactory,Prop,Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum Category {
    FOODS = "foods",
    DRINKS = "drinks"
}

export type itemDocument = item & Document;

@Schema({ collection: 'item' })
export class item{

@Prop({required : true, unique : true})
Name : string;

@Prop({required : true})
Price : number;

@Prop({required : true, enum : Category})
Category : Category;

}

export const ItemSchema = SchemaFactory.createForClass(item);