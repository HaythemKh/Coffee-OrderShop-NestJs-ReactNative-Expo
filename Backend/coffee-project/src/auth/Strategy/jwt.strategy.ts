import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from "../constants";

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy,'jwt') {

    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: true,
          secretOrKey: jwtConstants.secret,
        });
      }
    
      async validate(payload: any) {
        return payload;
      }
}