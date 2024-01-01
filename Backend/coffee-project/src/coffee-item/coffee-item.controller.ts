import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoffeeItemService } from './coffee-item.service';
import { CreateCoffeeItemDto } from './dto/create-coffee-item.dto';
import { UpdateCoffeeItemDto } from './dto/update-coffee-item.dto';
import { CoffeeItem } from './Model/coffee-item.model';

@Controller('coffee-item')
export class CoffeeItemController {
  constructor(private readonly coffeeItemService: CoffeeItemService) {}

  @Post('createCoffeeItem')
  async create(@Body() createCoffeeItemDto: CreateCoffeeItemDto) : Promise<any> {
    return await this.coffeeItemService.create(createCoffeeItemDto);
  }

  @Get("CoffeeItems")
  async findAll() : Promise<CoffeeItem[]> {
    return await this.coffeeItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeItemDto: UpdateCoffeeItemDto) {
    return this.coffeeItemService.update(+id, updateCoffeeItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeItemService.remove(+id);
  }
}
