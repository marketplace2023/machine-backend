import { Controller, Get } from '@nestjs/common';
import { ThermalService } from './thermal.service';

@Controller('temperature')
export class ThermalController {
  constructor(private readonly thermalService: ThermalService) {}

  @Get('zones')
  async getZones() {
    return await this.thermalService.getZones();
  }
}
