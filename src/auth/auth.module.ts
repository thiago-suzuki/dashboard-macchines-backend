import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  providers: [JwtStrategy],

  imports: [
    JwtModule.registerAsync({
      useFactory() {
        const privateSecret = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBK"

        return {
          signOptions: { algorithm: "HS256" },
          privateKey: privateSecret
        };
      },
    }),
  ],
})
export class AuthModule {}