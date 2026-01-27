import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectionCycle } from '../entities/injection-cycle.entity';

@Injectable()
export class InjectionService {
  constructor(
    @InjectRepository(InjectionCycle)
    private injectionCycleRepository: Repository<InjectionCycle>,
  ) {}

  async getParams() {
    const latestCycle = await this.injectionCycleRepository.findOne({
      where: {},
      order: { timestamp: 'DESC' },
    });

    return {
      screwTemp: latestCycle?.screwTemp || 0,
      clampingForce: latestCycle?.clampingForce || 0,
      pressureBar: latestCycle?.pressureBar || 0,
      consumptionKw: latestCycle?.consumptionKw || 0,
      timestamp: latestCycle?.timestamp || new Date(),
    };
  }

  adjustParams(adjustDto: { pressure?: number; speed?: number }) {
    // Aquí se implementaría la lógica de ajuste real
    // Por ahora retornamos un status de éxito
    return {
      status: 'success',
      message: 'Parámetros ajustados correctamente',
      adjustedParams: adjustDto,
      timestamp: new Date(),
    };
  }
}
