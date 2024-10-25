import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPriceTrackerController } from './token-price-tracker.controller';
import { TokenPriceTrackerService } from './token-price-tracker.service';
import { TokenPriceEntity } from '../entities/token-price.entity';
import { BlockchainService } from '../blockchain/blockchain.service'

@Module({
  imports: [TypeOrmModule.forFeature([TokenPriceEntity])],
  controllers: [TokenPriceTrackerController],
  providers: [TokenPriceTrackerService, BlockchainService],
})
export class TokenPriceTrackerModule {}
