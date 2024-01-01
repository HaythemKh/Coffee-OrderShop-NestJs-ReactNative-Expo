import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './Model/cart.model';
import { UpdateQuantityDto } from './dto/updateQuantity.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post("AddCoffee-To-Cart")
  async AddCoffeeToCart(@Body() createCartDto: CreateCartDto, @Request() req : any) : Promise<any> {
    return await this.cartService.create(createCartDto, req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get("Cart_Items")
  async findAll(@Request() req : any) : Promise<any[]> {
    return await this.cartService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/updateCartItemQuantity/:id')
  async update(@Param('id') id: string, @Body() updateQuantityDto: UpdateQuantityDto, @Request() req : any) :Promise<boolean> {
    return await this.cartService.updateQuantity(id, updateQuantityDto,req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
