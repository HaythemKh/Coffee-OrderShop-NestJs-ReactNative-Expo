import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request } from '@nestjs/common';
import { User } from './Model/user.model';
import { CreateUserDTO } from './UserDTO/CreateUser.dto';
import { updateUserDTO } from './UserDTO/UpdateUser.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
}

@Post("createUser")
async createUser(@Body() UserData : CreateUserDTO) : Promise<any>{
  return await this.usersService.CreateUser(UserData);
}

@UseGuards(AuthGuard('jwt'))
@Get("GetAdmins")
async GetAdmins(@Request() req:any) : Promise<User[]>{
return await this.usersService.GetAdmins(req);
}

@UseGuards(AuthGuard('jwt'))
@Get("GetCustomers")
async GetCustomers(@Request() req:any) : Promise<User[]>{
return await this.usersService.GetCustomers(req);
}

@UseGuards(AuthGuard('jwt'))
@Get("User/:id")
async GetSpecificUser(@Param('id') userName: string, @Request() req:any) : Promise<User>{
return await this.usersService.GetUser(userName,req);
}

@Patch(":id")
async updateUser(@Param('id') userName: string, @Body()updateUserDTO : updateUserDTO) : Promise<Boolean>{
  return await this.usersService.UpdateUser(userName,updateUserDTO);
}

@Delete(":id")
async deleteUser(@Param('id') userName: string) : Promise<Boolean>{
  return await this.usersService.DeleteUser(userName);
}

@UseGuards(AuthGuard('jwt'))
@Get("/MyProfile")
async PersonalInformation(@Request() req : any) : Promise<any> {
  return await this.usersService.PersonalInformation(req);
}

}