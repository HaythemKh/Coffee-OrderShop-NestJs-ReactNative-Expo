import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ItemModule } from './item/item.module';
import {MongooseModule}  from '@nestjs/mongoose'
import { CoffeeItemModule } from './coffee-item/coffee-item.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    ItemModule,
    CoffeeItemModule,
    CoffeeItemModule,
    CartModule,
    AuthModule,
    CommandsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
