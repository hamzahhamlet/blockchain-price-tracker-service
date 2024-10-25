import Moralis from 'moralis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPriceResponse } from './types'

@Injectable()
export class BlockchainService {
  private ethAddress: string;
  private ethChain: string;
  private polygonAddress: string;
  private polygonChain: string;
  private btcAddress: string;

  constructor(configService: ConfigService) {
    this.ethAddress = configService.get<string>('ETH_ADDRESS');
    this.ethChain = configService.get<string>('ETH_CHAIN');
    this.polygonAddress = configService.get<string>('POLYGON_ADDRESS');
    this.polygonChain = configService.get<string>('POLYGON_CHAIN');
    this.btcAddress = configService.get<string>('BITCOIN_ADDRESS');
  }

  getEthPrice() {
    return this.getTokenPrice(this.ethAddress, this.ethChain)
  }

  getPolygonPrice() {
    return this.getTokenPrice(this.polygonAddress, this.polygonChain)
  }

  getBtcPrice() {
    return this.getTokenPrice(this.btcAddress, this.polygonChain)
  }

  private async getTokenPrice(address: string, chain: string): Promise<TokenPriceResponse> {
    const response = await Moralis.EvmApi.token.getTokenPrice({
      chain,
      address,
      include: 'percent_change',
    });

    const data = response.toJSON();
    return {
        tokenName: data.tokenName,
        tokenSymbol: data.tokenSymbol,
        usdPrice: data.usdPrice,
        tokenAddress: data.tokenAddress,
        percentChangeInLast24hr: data['24hrPercentChange'] ?? '',
        // @ts-ignore
        // this response type is not available in the morallis version we are using
        blockTimestamp: data.blockTimestamp ?? '',
    }
  }

  private async getTokenPrice1HourAgo(address: string, chain: string): Promise<TokenPriceResponse> {
    
  }
}
