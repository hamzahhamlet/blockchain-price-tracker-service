import Moralis from 'moralis';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TokenPriceEntity } from '../entities/token-price.entity';
import { CreateTokenPriceDto } from './dto/swap.dto';

@Injectable()
export class SwapService {
  constructor(
    private readonly configService: ConfigService,
    private readonly 
  ) {}

  async calcSwapRate(ethAmount: number): Promise<{
    btcAmount: number;
    feeInEth: number;
    feeInUsd: number;
  }> {
    const [ethToken, btcToken] = await Promise.all([
      this.getTokenPrice(
        this.configService.get<string>('ETH_ADDRESS'),
        this.configService.get<string>('ETH_CHAIN'),
      ),
      this.getTokenPrice(
        this.configService.get<string>('BITCOIN_ADDRESS'),
        this.configService.get<string>('POLYGON_CHAIN'),
      ),
    ]);

    const ethToUsd = ethToken.toJSON().usdPrice;
    const btcToUsd = btcToken.toJSON().usdPrice;

    const totalEthValueInUsd = ethAmount * ethToUsd;

    const feePercentage = 0.03;
    const totalFeeUsd = totalEthValueInUsd * feePercentage;
    const totalFeeEth = totalFeeUsd / ethToUsd;

    const valueAfterFee = totalEthValueInUsd - totalFeeUsd;

    const btcAmount = valueAfterFee / btcToUsd;

    return {
      btcAmount,
      feeInEth: totalFeeEth,
      feeInUsd: totalFeeUsd,
    };
  }
}
