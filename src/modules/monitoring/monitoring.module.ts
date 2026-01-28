import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';
import { MachineStatus } from '../entities/machine-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MachineStatus])],
  controllers: [MonitoringController],
  providers: [MonitoringService],
})
export class MonitoringModule {}
