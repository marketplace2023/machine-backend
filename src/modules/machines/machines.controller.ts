import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MachinesService } from './machines.service';
import { Machine } from '../entities/machine.entity';

@Controller('Machine/api/machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Get()
  async findAll(): Promise<Machine[]> {
    return await this.machinesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Machine> {
    return await this.machinesService.findOne(id);
  }

  @Post()
  async create(@Body() machineData: Partial<Machine>): Promise<Machine> {
    return await this.machinesService.create(machineData);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() machineData: Partial<Machine>,
  ): Promise<Machine> {
    return await this.machinesService.update(id, machineData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.machinesService.remove(id);
  }
}
