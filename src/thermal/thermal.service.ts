import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThermalZone } from '../entities/thermal-zone.entity';

@Injectable()
export class ThermalService {
  constructor(
    @InjectRepository(ThermalZone)
    private thermalZoneRepository: Repository<ThermalZone>,
  ) {}

  async getZones() {
    // Obtener las zonas térmicas más recientes por índice de zona
    const zones = await this.thermalZoneRepository
      .createQueryBuilder('zone')
      .distinctOn(['zone.zoneIndex'])
      .orderBy('zone.zoneIndex', 'ASC')
      .addOrderBy('zone.timestamp', 'DESC')
      .getMany();

    return zones.map((zone) => ({
      zoneIndex: zone.zoneIndex,
      actualTemp: zone.actualTemp,
      stabilityPct: zone.stabilityPct,
      timestamp: zone.timestamp,
      location: zone.zoneIndex <= 5 ? 'Husillo' : 'Molde',
    }));
  }
}
