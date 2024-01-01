import { Module } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CommandsController } from './commands.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { commands, commandsSchema } from 'src/schemas/Commands.schema';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports : [MongooseModule.forFeature([{name : commands.name, schema : commandsSchema }]),
  CartModule],
  controllers: [CommandsController],
  providers: [CommandsService]
})
export class CommandsModule {}
