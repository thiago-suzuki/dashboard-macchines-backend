import { Module } from '@nestjs/common';
import { MacchineService } from './macchine.service';
import { MacchineController } from './macchine.controller';
import { DbModule } from '@/config/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [MacchineController],
  providers: [MacchineService],
})
export class MacchineModule {}
