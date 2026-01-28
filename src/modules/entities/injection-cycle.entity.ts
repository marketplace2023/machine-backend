import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tbl_injection_cycles')
export class InjectionCycle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'screw_temp' })
  screwTemp: number;

  @Column({ type: 'decimal', precision: 8, scale: 2, name: 'clamping_force' })
  clampingForce: number;

  @Column({ type: 'int', name: 'pressure_bar' })
  pressureBar: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, name: 'consumption_kw' })
  consumptionKw: number;

  @CreateDateColumn({ type: 'datetime' })
  timestamp: Date;
}
