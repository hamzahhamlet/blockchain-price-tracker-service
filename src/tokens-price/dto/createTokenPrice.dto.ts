import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsDecimal,
} from 'class-validator';

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
