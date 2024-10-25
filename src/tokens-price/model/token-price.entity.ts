import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('tokenPrices')
export class TokenPriceModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  tokenName: string;

  @Column({ type: 'varchar' })
  tokenSymbol: string;

  @Column({ type: 'varchar' })
  tokenAddress: string;

  @Column({ type: 'decimal' })
  usdPrice: number;

  @Column({ type: 'varchar' })
  blockTimestamp: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
