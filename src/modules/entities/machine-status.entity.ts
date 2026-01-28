import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tbl_machine_status')
export class MachineStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'oee_global' })
  oeeGlobal: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, name: 'cycle_time' })
  cycleTime: number;

  @Column({ type: 'int', name: 'servos_health' })
  servosHealth: number;

  @CreateDateColumn({ type: 'datetime' })
  timestamp: Date;
}
