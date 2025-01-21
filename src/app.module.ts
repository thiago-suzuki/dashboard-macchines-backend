import { Module } from '@nestjs/common';

import { DbModule } from '@/config/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { UserModule } from './app/user/user.module';
import { MacchineModule } from './app/macchine/macchine.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth-guard';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    AuthModule,
    DbModule,
    AuthenticationModule,
    UserModule,
    MacchineModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
