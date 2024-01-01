import { Schema ,Prop,SchemaFactory } from "@nestjs/mongoose";
import {Document}  from 'mongoose';

export type tableDocument = table & Document;

@Schema({ collection: 'table' })
export class table{

@Prop({required : true, unique : true})
TableID : string;

@Prop({required : true , default : false})
Disponibility : Boolean;

@Prop({required : true, default: []})
ListItems : string[];

}

export const TableSchema = SchemaFactory.createForClass(table);