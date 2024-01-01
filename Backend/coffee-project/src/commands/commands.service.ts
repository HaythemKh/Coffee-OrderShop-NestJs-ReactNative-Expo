import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { commands, commandsData, CommandsDocument } from 'src/schemas/Commands.schema';
import { CartService } from 'src/cart/cart.service';
import { Command } from './Model/command.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCommandDto } from './dto/create-command.dto';
import { Role } from 'src/schemas/user.schema';

@Injectable()
export class CommandsService {

  constructor(@InjectModel(commands.name) private commandsModel : Model<CommandsDocument>,
  @Inject(CartService) private cartService : CartService
  ){}


  async checkout(req : any) : Promise<any> {

    const ItemsFromCartByUser = await this.cartService.findAllByUser(req.user.sub);
    if(ItemsFromCartByUser.length !== 0)
    {
      const totalPrices = ItemsFromCartByUser.reduce(
        (total, item) => total + item.Price * item.Quantity,
        0,);

      const ListCommands : Command[] = [];

      for (const item of ItemsFromCartByUser) {
        const command : Command = new Command(item.Name, item.Size, item.Quantity, item.Price);
        ListCommands.push(command);
      }


        const created = await this.commandsModel.create({
          UserId : req.user.sub,
          ListItems : ListCommands,
          Total : totalPrices
        })
        if(created)
        {
          const CartIsEmpty = await this.cartService.ClearUserCart((req.user.sub));
          if(CartIsEmpty)
          return {"message" : "command added successfully"}
        } 

        throw new BadRequestException("Problem in adding command");
    }
    else 
    throw new BadRequestException("There is no items for checkout");
  }


  async BuyItem(data : CreateCommandDto, req : any) : Promise<any>{
    const ListCommands : Command[] = [];
    const command : Command = new Command(data.Name, data.Size, data.Quantity, data.Price);
    ListCommands.push(command);

    const created = await this.commandsModel.create({
      UserId : req.user.sub,
      ListItems : ListCommands,
      Total : command.CoffeePrice
    });
    if(created) return {"message" : "Order added successfully"}
    throw new BadRequestException("Problem in buying Coffee");
  }

  async findAll(req : any) : Promise<any[]> {
    if(req.user.role !== Role.ADMIN) throw new UnauthorizedException();
    const ListCommands : any[] = [];
        const Items = await this.commandsModel.find();
        Items.forEach((item) =>{
          ListCommands.push(new commandsData(item));
        })
        return ListCommands;
  }

  async findCommandsByUser(req: any) : Promise<any[]> {
    
    const ListCommands : any[] = [];
        const Items = await this.commandsModel.find({UserId : req.user.sub});
        Items.forEach((item) =>{
          ListCommands.push(new commandsData(item));
        })
        return ListCommands;
  }
}
