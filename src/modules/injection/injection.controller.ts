import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectionService } from './injection.service';

@Controller('injection')
export class InjectionController {
  constructor(private readonly injectionService: InjectionService) {}

  @Get('params')
  async getParams() {
    return await this.injectionService.getParams();
  }

  @Post('adjust')
  async adjustParams(@Body() adjustDto: { pressure?: number; speed?: number }) {
    return await this.injectionService.adjustParams(adjustDto);
  }
}
