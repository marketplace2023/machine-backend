import { Controller, Get } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get('live')
  async getLiveData() {
    return await this.monitoringService.getLiveData();
  }

  @Get('diagnostics')
  async getDiagnostics() {
    return await this.monitoringService.getDiagnostics();
  }
}
