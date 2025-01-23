import { Module } from '@nestjs/common';
import { MacchineService } from './macchine.service';
import { MacchineController } from './macchine.controller';
import { DbModule } from '@/config/db/db.module';
import { MachinesGateway } from './macchine.gateway';

@Module({
  imports: [DbModule],
  controllers: [MacchineController],
  providers: [MachinesGateway, MacchineService],
})
export class MacchineModule {}
