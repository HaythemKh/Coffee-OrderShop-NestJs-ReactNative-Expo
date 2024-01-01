import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, item, itemDocument } from 'src/schemas/item.schema';
import { CreateItemDTO } from './ItemDTO/CreateItem.dto';
import { UpdateItemDTO } from './ItemDTO/UpdateItem.dto';
import { Item } from './Model/item.model';

@Injectable()
export class ItemService {
    constructor(@InjectModel(item.name) private itemModel : Model<itemDocument>){}

    async createItem(ItemData : CreateItemDTO) : Promise<any>{
        const IsItemExist = await this.itemModel.findOne({Name : ItemData.Name});
        if(IsItemExist) throw new BadRequestException("Item Name exist try with another one");
        const item = new Item(ItemData);
        const Created = await this.itemModel.create(item);
        if(Created) return {"message" : "Item created succeffully"}
        return {"message" : "Item does not created"};
    } 

    async AllItems() : Promise<Item[]>{
        const ListItems : Item[] = [];
        const Items = await this.itemModel.find();
        Items.forEach((item) =>{
            ListItems.push(new Item(item));
        })

        return ListItems;
    }

    async FoodsItems() : Promise<Item[]>{
        const ListFoodsItems : Item[] = [];
        const FoodsItems = await this.itemModel.find({Category : Category.FOODS});
        FoodsItems.forEach((item) =>{
            ListFoodsItems.push(new Item(item));
        })

        return ListFoodsItems;
    }

    async DrinksItems() : Promise<Item[]>{
        const ListDrinksItems : Item[] = [];
        const DrinksItems = await this.itemModel.find({Category : Category.DRINKS});
        DrinksItems.forEach((item) =>{
            ListDrinksItems.push(new Item(item));
        })

        return ListDrinksItems;
    }

    async getItem(ItemName : string) : Promise<Item | null>{
        const CurrentItem = await this.itemModel.findOne({Name : ItemName});
        if(!CurrentItem) throw new NotFoundException("Item does not exist");
        const item = new Item(CurrentItem);
        return item;
    }

    async UpdateItem(ItemName : string, itemData : UpdateItemDTO) : Promise<Boolean>{
        const FindItem = await this.itemModel.findOne({Name : ItemName});
        if(!FindItem) throw new BadRequestException("Item does not exist");

        if(itemData.Name){
         const findUpdateData = await this.itemModel.findOne({Name : itemData.Name});
         if(findUpdateData && (FindItem._id.toString() !== findUpdateData._id.toString()))
         throw new BadRequestException("Item name exist choose another name");
        }
         const item = new Item(itemData);
         const UpdatedItem = await this.itemModel.findByIdAndUpdate(
            {_id : FindItem._id},
            {$set : item},
            {new : true},
            );
            return !!UpdatedItem;
    }

    
    async DeleteItem(ItemName : string) : Promise<Boolean>{
        const findItem = await this.itemModel.findOne({Name : ItemName});
        if(!findItem) throw new NotFoundException("Item does not exist");
        const deletedItem = await this.itemModel.findByIdAndDelete({_id : findItem._id});
        
        return !!deletedItem;
    }  

}
