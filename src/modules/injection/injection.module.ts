import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InjectionController } from './injection.controller';
import { InjectionService } from './injection.service';
import { InjectionCycle } from '../entities/injection-cycle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InjectionCycle])],
  controllers: [InjectionController],
  providers: [InjectionService],
})
export class InjectionModule {}
