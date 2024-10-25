import Moralis from 'moralis';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TokenPriceEntity } from './entity/token-price.entity';
import { CreateTokenPriceDto } from './dto/createTokenPrice.dto';

@Injectable()
export class TokensPriceService {
  constructor(
    @InjectRepository(TokenPriceEntity)
    private readonly tokenPriceEntity: Repository<TokenPriceEntity>,
    private readonly configService: ConfigService,
  ) {}

  async saveTokenPrice(data: CreateTokenPriceDto): Promise<TokenPriceEntity> {
    try {
      const tokenPrice = this.tokenPriceEntity.create(data);
      return await this.tokenPriceEntity.save(tokenPrice);
    } catch (err) {
      console.error('Error in saveTokenPrice:', err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTokenPrice(address: string, chain: string) {
    try {
      const response = await Moralis.EvmApi.token.getTokenPrice({
        chain,
        address,
        include: 'percent_change',
      });

      return response;
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Cron('*/5 * * * *')
  async handleCronForUpdatePrices() {
    try {
      const tokensList = await Promise.all([
        this.getTokenPrice(
          this.configService.get<string>('ETH_ADDRESS'),
          this.configService.get<string>('ETH_CHAIN'),
        ),
        this.getTokenPrice(
          this.configService.get<string>('POLYGON_ADDRESS'),
          this.configService.get<string>('POLYGON_CHAIN'),
        ),
      ]);

      tokensList.forEach(async (token) => {
        const tokenJSON = token.toJSON();

        await this.saveTokenPrice({
          tokenName: tokenJSON.tokenName,
          tokenSymbol: tokenJSON.tokenSymbol,
          tokenAddress: tokenJSON.tokenAddress,
          usdPrice: tokenJSON.usdPrice,
          percentChangeInLast24hr: tokenJSON['24hrPercentChange'] ?? '',
          // @ts-ignore
          blockTimestamp: tokenJSON.blockTimestamp ?? '',
        });
      });
    } catch (err) {
      console.error(err);
    }
  }
}
