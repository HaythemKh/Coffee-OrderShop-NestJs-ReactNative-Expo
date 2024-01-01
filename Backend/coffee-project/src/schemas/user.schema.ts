import { Schema ,Prop,SchemaFactory } from "@nestjs/mongoose";
import {Document}  from 'mongoose';

export type userDocument = user & Document;

export enum Role {
    ADMIN = "admin",
    CUSTOMER = "customer"
}

@Schema({ collection: 'users' })
export class user{
@Prop({required : true})
FirstName : string;

@Prop({required : true})
LastName : string;

@Prop({required : true, unique : true})
Email : string;

@Prop({required : true})
Password : string;

@Prop({required : true, unique : true})
PhoneNumber : string;

@Prop({required : true})
FullAddress : string;

@Prop({required : true, default : Role.CUSTOMER})
Role : Role;
}


export const UserSchema = SchemaFactory.createForClass(user);