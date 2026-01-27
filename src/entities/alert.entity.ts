import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum AlertSeverity {
  CRITICAL = 'critical',
  WARNING = 'warning',
  INFO = 'info',
}

@Entity('tbl_alerts_log')
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AlertSeverity,
    default: AlertSeverity.INFO,
  })
  severity: AlertSeverity;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', length: 50, name: 'location_tag' })
  locationTag: string;

  @Column({ type: 'boolean', default: false, name: 'is_resolved' })
  isResolved: boolean;

  @CreateDateColumn({ type: 'datetime' })
  timestamp: Date;
}
