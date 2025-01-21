import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { DbModule } from '@/config/db/db.module';
import { UserModule } from '@/app/user/user.module';

@Module({
  imports: [DbModule, UserModule, JwtModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
