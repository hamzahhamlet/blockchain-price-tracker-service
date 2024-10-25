import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenPriceEntity } from './entity/token-price.entity';
import { TokensPriceController } from './tokens-price.controller';
import { TokensPriceService } from './tokens-price.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenPriceEntity])],
  controllers: [TokensPriceController],
  providers: [TokensPriceService],
})
export class TokensPriceModule {}
