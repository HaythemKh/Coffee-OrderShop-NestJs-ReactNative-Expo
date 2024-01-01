import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './Model/cart.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CartDocument, cartShop } from 'src/schemas/CartShop.schema';
import { coffeeItem,CoffeeDocument } from 'src/schemas/CoffeeItem.schema';
import { UpdateQuantityDto } from './dto/updateQuantity.dto';


@Injectable()
export class CartService {

  constructor(@InjectModel(cartShop.name) private cartModel : Model<CartDocument>,
  @InjectModel(coffeeItem.name) private coffeeModel : Model<CoffeeDocument>
  ){}

  async create(createCartDto: CreateCartDto, req : any) : Promise<any> {
    const IsItemExist = await this.cartModel.findOne({Size : createCartDto.Size,CoffeeId : createCartDto.CoffeeId, UserId : req.user.sub});
        if(IsItemExist) throw new BadRequestException("Item already exist in cart");
        createCartDto.UserId = req.user.sub;
        const item : Cart = new Cart(createCartDto);
        const Created = await this.cartModel.create(item);
        if(Created) return {"message" : "item added to cart succeffully"}
        return {"message" : "item does not added"};
  }

  async findAll(req : any) : Promise<any[]> {
    const CartItems : any[] = [];
    const Items = await this.cartModel.find({UserId : req.user.sub});
    for (const item of Items) {
      const Coffee = await this.coffeeModel.findOne({ _id: item.CoffeeId });
  
      if (Coffee) {
        const CartCoffee = { ...item.toObject(), Name: Coffee.Name, Image : Coffee.Image };
        CartItems.push(CartCoffee);
      }
    }
    return CartItems;
  }
  async updateQuantity(id: string, updateQuantityDto : UpdateQuantityDto, req : any) : Promise<boolean>{
    const IsItemExist = await this.cartModel.findOne({_id : id, UserId : req.user.sub});
    if(!IsItemExist) throw new BadRequestException("Item doesnt exist in cart");
    if(!updateQuantityDto.Quantity) return true;
    const cartItem = new Cart(updateQuantityDto);
    const updatedCart = await this.cartModel.findByIdAndUpdate(
      {_id : IsItemExist._id},
      {$set: cartItem},
      {new: true},
    )
    if(!updatedCart) return false;
    console.log(updateQuantityDto.Quantity)
    return true;
  }

  async ClearUserCart(req : any) : Promise<boolean> {
    const deletedCart = await this.cartModel.deleteMany({ UserId : req });
      return !!deletedCart;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }

  async findAllByUser(req : string) : Promise<any[]> {
    const CartItems : any[] = [];
    const Items = await this.cartModel.find({UserId : req});
    for (const item of Items) {
      const Coffee = await this.coffeeModel.findOne({ _id: item.CoffeeId });
  
      if (Coffee) {
        const CartCoffee = { ...item.toObject(), Name: Coffee.Name, Image : Coffee.Image };
        CartItems.push(CartCoffee);
      }
    }
    return CartItems;
  }
}
