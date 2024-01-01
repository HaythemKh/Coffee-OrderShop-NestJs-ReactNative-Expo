import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { cartShop, cartShopSchema } from 'src/schemas/CartShop.schema';
import { coffeeItem, coffeeItemSchema } from 'src/schemas/CoffeeItem.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : cartShop.name, schema : cartShopSchema }]),
  MongooseModule.forFeature([{name : coffeeItem.name, schema : coffeeItemSchema }])],
  controllers: [CartController],
  providers: [CartService],
  exports : [CartService]
})
export class CartModule {}
