import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtStrategy } from './Strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports : [JwtModule.register({
    secret : jwtConstants.secret,
  }),
  UsersModule],
  controllers: [AuthController],
  providers: [AuthService,jwtStrategy]
})
export class AuthModule {}
