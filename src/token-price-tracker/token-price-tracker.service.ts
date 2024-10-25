import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TokenPriceEntity } from '../entities/token-price.entity';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
export class TokenPriceTrackerService {
  constructor(
    @InjectRepository(TokenPriceEntity)
    private readonly tokenPriceEntity: Repository<TokenPriceEntity>,
    private readonly configService: ConfigService,
    private readonly blockchainService: BlockchainService,
  ) {}

  async saveTokenPrice(
    data: Partial<TokenPriceEntity>,
  ): Promise<TokenPriceEntity> {
    const tokenPrice = this.tokenPriceEntity.create({
      ...data,
      
    });
    return this.tokenPriceEntity.save(tokenPrice);
  }

  @Cron('*/5 * * * *')
  async handleCronForUpdatePrices() {
    const tokensList = await Promise.all([
      this.blockchainService.getEthPrice(),
      this.blockchainService.getPolygonPrice(),
    ]);

    tokensList.forEach(async (data) => {
      await this.saveTokenPrice(data);
    });
  }
}
