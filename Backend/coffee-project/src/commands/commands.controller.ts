import { Controller, Get, Post, Body, Patch, Param, Delete, Request,UseGuards } from '@nestjs/common';
import { CommandsService } from './commands.service';
import { CreateCommandDto } from './dto/create-command.dto';
import { UpdateCommandDto } from './dto/update-command.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('commands')
export class CommandsController {
  constructor(private readonly commandsService: CommandsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post("Checkout")
  async Checkout(@Request() req : any) {
    return this.commandsService.checkout(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("GetCommandsByUser")
  async findCommandsByUser(@Request() req : any) : Promise<any[]>{
    return this.commandsService.findCommandsByUser(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("ListOfCommands")
  async ListCommands(@Request() req : any) : Promise<any[]>{
    return this.commandsService.findAll(req);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post("BuyItem")
  async BuyItem(@Body() createCommandDto:CreateCommandDto, @Request() req : any) : Promise<any>{
    return this.commandsService.BuyItem(createCommandDto,req);
  }
}
