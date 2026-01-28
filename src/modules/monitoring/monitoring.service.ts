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

    // Convertir el valor numérico de servosHealth a string
    const servosHealthValue = latestStatus?.servosHealth || 0;
    let servosHealthStatus: 'good' | 'warning' | 'critical';

    if (servosHealthValue >= 90) {
      servosHealthStatus = 'good';
    } else if (servosHealthValue >= 70) {
      servosHealthStatus = 'warning';
    } else {
      servosHealthStatus = 'critical';
    }

    return {
      oee: latestStatus?.oeeGlobal || 0,
      cycleTime: latestStatus?.cycleTime || 0,
      servosHealth: servosHealthStatus,
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
