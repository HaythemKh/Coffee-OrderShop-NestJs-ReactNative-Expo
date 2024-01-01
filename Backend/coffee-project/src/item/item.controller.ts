import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDTO } from './ItemDTO/CreateItem.dto';
import { UpdateItemDTO } from './ItemDTO/UpdateItem.dto';
import { Item } from './Model/item.model';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

@Post("createItem")
async createTable(@Body() ItemData : CreateItemDTO) : Promise<any>{
  return await this.itemService.createItem(ItemData);
}

@Get("AllItems")
async AllItems() : Promise<Item[]>{
  return await this.itemService.AllItems();
}

@Get("FoodItems")
async FoodsItems() : Promise<Item[]>{
  return await this.itemService.FoodsItems();
}

@Get("DrinksItems")
async DrinksItems() : Promise<Item[]>{
  return await this.itemService.DrinksItems();
}

@Get("SpecificItem/:id")
async getItem(@Param("id") ItemName : string) : Promise<Item | null>{
  return await this.itemService.getItem(ItemName);
}

@Patch(":id")
async UpdateItem(@Param("id") ItemName : string, @Body() itemData : UpdateItemDTO) : Promise<Boolean>{
  return await this.itemService.UpdateItem(ItemName,itemData);
}

@Delete(":id")
async DeleteItem(@Param("id") ItemName : string) : Promise<Boolean>{
  return await this.itemService.DeleteItem(ItemName);
}
}
