import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tbl_thermal_zones')
export class ThermalZone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'zone_index' })
  zoneIndex: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, name: 'actual_temp' })
  actualTemp: number;

  @Column({ type: 'int', name: 'stability_pct' })
  stabilityPct: number;

  @CreateDateColumn({ type: 'datetime' })
  timestamp: Date;
}
