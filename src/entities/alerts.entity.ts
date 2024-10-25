import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('alerts')
export class AlertsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  chain: string;

  @Column({ type: 'decimal' })
  dollar: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'boolean', default: false })
  isSent: boolean;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
