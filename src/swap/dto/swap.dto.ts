import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsDecimal,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenPriceDto {
  @IsString()
  @IsNotEmpty()
  tokenName: string;

  @IsString()
  @IsNotEmpty()
  tokenSymbol: string;

  @IsString()
  @IsNotEmpty()
  tokenAddress: string;

  @IsDecimal()
  @IsNotEmpty()
  usdPrice: number;

  @IsString()
  @IsNotEmpty()
  percentChangeInLast24hr: string;

  @IsNumberString()
  @IsNotEmpty()
  blockTimestamp: string;
}

export class SwapResponse {
  @IsNumber()
  @ApiProperty({ description: 'Amount you receive after swap' })
  btcAmount: number;

  @IsNumber()
  @ApiProperty({ description: 'Fee deducted (Eth Representation)' })
  feeInEth: number;

  @IsNumber()
  @ApiProperty({ description: 'Fee deducted (USD Representation)' })
  feeInUsd: number;
}
