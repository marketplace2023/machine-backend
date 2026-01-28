import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from '../entities/alert.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
  ) {}

  async getActiveAlerts() {
    const alerts = await this.alertRepository.find({
      where: { isResolved: false },
      order: { timestamp: 'DESC' },
    });

    return alerts.map((alert) => ({
      id: alert.id,
      severity: alert.severity,
      message: alert.message,
      locationTag: alert.locationTag,
      timestamp: alert.timestamp,
    }));
  }

  async resolveAlert(id: number) {
    const alert = await this.alertRepository.findOne({ where: { id } });

    if (!alert) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }

    alert.isResolved = true;
    await this.alertRepository.save(alert);

    return {
      status: 'success',
      message: 'Alerta marcada como resuelta',
      alert: {
        id: alert.id,
        severity: alert.severity,
        message: alert.message,
        isResolved: alert.isResolved,
      },
    };
  }
}
