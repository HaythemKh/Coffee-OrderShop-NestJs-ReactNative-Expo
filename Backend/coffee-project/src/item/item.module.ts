import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { item, ItemSchema } from 'src/schemas/item.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : item.name, schema : ItemSchema }])],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule {}
