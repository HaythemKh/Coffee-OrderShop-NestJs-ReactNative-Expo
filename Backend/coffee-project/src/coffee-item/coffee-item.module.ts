import { Module } from '@nestjs/common';
import { CoffeeItemService } from './coffee-item.service';
import { CoffeeItemController } from './coffee-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { coffeeItem, coffeeItemSchema } from 'src/schemas/CoffeeItem.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : coffeeItem.name, schema : coffeeItemSchema }])],
  controllers: [CoffeeItemController],
  providers: [CoffeeItemService]
})
export class CoffeeItemModule {}
