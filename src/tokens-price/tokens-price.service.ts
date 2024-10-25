import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Moralis from 'moralis';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenPriceModel } from './model/token-price.entity';
import { CreateTokenPriceDto } from './dto/createTokenPrice.dto';

@Injectable()
export class TokensPriceService {
  constructor(
    @InjectRepository(TokenPriceModel)
    private readonly tokenPriceModel: Repository<TokenPriceModel>,
    private readonly configService: ConfigService,
  ) {}

  async saveTokenPrice(data: CreateTokenPriceDto): Promise<TokenPriceModel> {
    try {
      const tokenPrice = this.tokenPriceModel.create(data);
      return await this.tokenPriceModel.save(tokenPrice);
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

  @Cron('*/30 * * * * *')
  async handleCronForUpdatePrices() {
    try {
      const ethToken = await this.getTokenPrice(
        this.configService.get<string>('ETH_ADDRESS'),
        this.configService.get<string>('ETH_CHAIN'),
      );

      const polygonToken = await this.getTokenPrice(
        this.configService.get<string>('POLYGON_ADDRESS'),
        this.configService.get<string>('POLYGON_CHAIN'),
      );

      const ethTokenJson = ethToken.toJSON();
      const polygonTokenJson = polygonToken.toJSON();

      console.log({ ethTokenJson, polygonTokenJson });

      const token1 = await this.saveTokenPrice({
        tokenName: ethTokenJson.tokenName,
        tokenSymbol: ethTokenJson.tokenSymbol,
        tokenAddress: ethTokenJson.tokenAddress,
        usdPrice: ethTokenJson.usdPrice,
        // @ts-ignore
        blockTimestamp: ethTokenJson.blockTimestamp ?? '',
      });

      const token2 = await this.saveTokenPrice({
        tokenName: polygonTokenJson.tokenName,
        tokenSymbol: polygonTokenJson.tokenSymbol,
        tokenAddress: polygonTokenJson.tokenAddress,
        usdPrice: polygonTokenJson.usdPrice,
        // @ts-ignore
        blockTimestamp: polygonTokenJson.blockTimestamp ?? '',
      });

      console.log({ token1, token2 });
    } catch (err) {
      console.error(err);
    }
  }
}
