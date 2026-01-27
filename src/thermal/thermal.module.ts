import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThermalController } from './thermal.controller';
import { ThermalService } from './thermal.service';
import { ThermalZone } from '../entities/thermal-zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThermalZone])],
  controllers: [ThermalController],
  providers: [ThermalService],
})
export class ThermalModule {}
