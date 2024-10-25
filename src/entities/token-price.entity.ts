import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('tokenPrices')
export class TokenPriceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  tokenName: string; // polygon

  @Column({ type: 'varchar' })
  tokenSymbol: string; // eth

  @Column({ type: 'varchar' })
  tokenAddress: string; // address

  @Column({ type: 'decimal' })
  usdPrice: number; // usd price at the time

  @Column({ type: 'varchar', nullable: true, default: '0' })
  percentChangeInLast24hr: string; // percentage change in last 24 hours

  @Column({ type: 'varchar' })
  blockTimestamp: string; // latest block timestamp

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
