
import { SchemaFactory,Prop,Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Command } from "src/commands/Model/command.model";

export type CommandsDocument = commands & Document;
export class commandsData{
    readonly UserId : string;
    readonly ListItems : Command[];
    readonly Total : number;
    readonly createdAt : Date;

    constructor(data : any)
    {
        this.UserId = data.UserId;
        this.ListItems = data.ListItems;
        this.Total = data.Total;
        this.createdAt = data.createdAt;
    }
}
@Schema({ collection: 'commands' })
export class commands{

@Prop({required : true})
UserId : string;

@Prop({required: true })
ListItems : Command[];

@Prop({required : true})
Total : number;

@Prop({required:true,immutable : true, default : Date.now})
createdAt : Date;


}
export const commandsSchema = SchemaFactory.createForClass(commands);