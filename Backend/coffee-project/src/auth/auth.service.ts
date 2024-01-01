import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/schemas/user.schema';

Role
@Injectable()
export class AuthService {

  constructor(private jwtService : JwtService,
              @Inject(UsersService) private usersService : UsersService){}

  async SignInUser(login: CreateAuthDto) : Promise<any> {
    const user = await this.usersService.FindUserByEmailAndPassword(login.Email, login.Password);
    if(!user) throw new NotFoundException("Email Or Password are incorrect");
    return this.GenerateToken(user._id,user.Email,user.Role);
  }

  GenerateToken(userId : string, email : string, role : Role){
    return this.jwtService.sign({
        sub : userId,
        email : email,
        role : role,
    })
}
}
