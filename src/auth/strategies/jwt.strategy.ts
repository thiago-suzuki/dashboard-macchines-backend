import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadTokenDTO } from "../dto/auth.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const privateSecret =  "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBK"

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
      ignoreExpiration: true,
      secretOrKey: privateSecret,
      algorithms: ["HS256"]
    });
  }

  async validate(payload: PayloadTokenDTO) {
    return payload
  }
}
