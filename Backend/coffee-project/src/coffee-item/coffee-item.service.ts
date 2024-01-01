import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeItemDto } from './dto/create-coffee-item.dto';
import { UpdateCoffeeItemDto } from './dto/update-coffee-item.dto';
import { CoffeeItem } from './Model/coffee-item.model';
import { coffeeItem,CoffeeDocument } from 'src/schemas/CoffeeItem.schema';


@Injectable()
export class CoffeeItemService {

  constructor(@InjectModel(coffeeItem.name) private coffeeModel : Model<CoffeeDocument>){}

  async create(createCoffeeItemDto: CreateCoffeeItemDto) : Promise<any> {
    const IsItemExist = await this.coffeeModel.findOne({Name : createCoffeeItemDto.Name});
        if(IsItemExist) throw new BadRequestException("Coffee Name exist try with another one");
        const item : CoffeeItem = new CoffeeItem(createCoffeeItemDto);
        const Created = await this.coffeeModel.create(item);
        if(Created) return {"message" : "Coffee created succeffully"}
        return {"message" : "Coffee does not created"};
  }

  async findAll() : Promise<CoffeeItem[]> {
    const ListItems : CoffeeItem[] = [];
        const Items = await this.coffeeModel.find();
        Items.forEach((item) =>{
            ListItems.push(new CoffeeItem(item));
        })
        return ListItems;
  }

  findOne(id: number) {
    return `This action returns a #${id} coffeeItem`;
  }

  update(id: number, updateCoffeeItemDto: UpdateCoffeeItemDto) {
    return `This action updates a #${id} coffeeItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffeeItem`;
  }
}
