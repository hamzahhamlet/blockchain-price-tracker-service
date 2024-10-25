import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPriceModel } from './model/token-price.entity';
import { TokensPriceController } from './tokens-price.controller';
import { TokensPriceService } from './tokens-price.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenPriceModel])],
  controllers: [TokensPriceController],
  providers: [TokensPriceService],
})
export class TokensPriceModule {}
