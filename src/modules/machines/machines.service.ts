import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Machine } from '../entities/machine.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository(Machine)
    private machinesRepository: Repository<Machine>,
  ) {}

  async findAll(): Promise<Machine[]> {
    return await this.machinesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Machine> {
    const machine = await this.machinesRepository.findOne({
      where: { id },
    });

    if (!machine) {
      throw new NotFoundException(`Machine with ID ${id} not found`);
    }

    return machine;
  }

  async create(machineData: Partial<Machine>): Promise<Machine> {
    const machine = this.machinesRepository.create(machineData);
    return await this.machinesRepository.save(machine);
  }

  async update(id: number, machineData: Partial<Machine>): Promise<Machine> {
    await this.findOne(id); // Verificar que existe
    await this.machinesRepository.update(id, machineData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const machine = await this.findOne(id);
    await this.machinesRepository.remove(machine);
  }
}
