import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPriceEntity } from '../entities/token-price.entity';
import { SwapController } from './swap.controller';
import { SwapService } from './swap.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenPriceEntity])],
  controllers: [SwapController],
  providers: [SwapService],
})
export class SwapModule {}
