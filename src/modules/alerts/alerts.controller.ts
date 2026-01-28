import { Controller, Get, Put, Param } from '@nestjs/common';
import { AlertsService } from './alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Get('active')
  async getActiveAlerts() {
    return await this.alertsService.getActiveAlerts();
  }

  @Put('resolve/:id')
  async resolveAlert(@Param('id') id: string) {
    return await this.alertsService.resolveAlert(+id);
  }
}
