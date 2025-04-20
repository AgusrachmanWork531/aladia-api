import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default-secret', // Use a strong secret key for signing the JWT
    });
  }

  async validate(payload: any) {
    // Here you can add your logic to validate the user based on the payload
    return { userId: payload.sub, username: payload.username };
  }
}