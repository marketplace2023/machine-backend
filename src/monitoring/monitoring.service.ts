import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineStatus } from '../entities/machine-status.entity';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectRepository(MachineStatus)
    private machineStatusRepository: Repository<MachineStatus>,
  ) {}

  async getLiveData() {
    // Obtener el último registro del estado de la máquina
    const latestStatus = await this.machineStatusRepository.findOne({
      where: {},
      order: { timestamp: 'DESC' },
    });

    return {
      oee: latestStatus?.oeeGlobal || 0,
      cycleTime: latestStatus?.cycleTime || 0,
      servosHealth: latestStatus?.servosHealth || 0,
      timestamp: latestStatus?.timestamp || new Date(),
    };
  }

  getDiagnostics() {
    // Simulación de diagnóstico de actuadores
    return [
      {
        actuator: 'Servo Motor Principal',
        status: 'Operativo',
        temperature: 45,
        vibration: 2.1,
      },
      {
        actuator: 'Servo de Inyección',
        status: 'Operativo',
        temperature: 42,
        vibration: 1.8,
      },
      {
        actuator: 'Servo de Cierre',
        status: 'Advertencia',
        temperature: 52,
        vibration: 3.2,
      },
    ];
  }
}
