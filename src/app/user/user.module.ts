import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DbModule } from '@/config/db/db.module';

@Module({
  controllers: [],
  imports: [DbModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
