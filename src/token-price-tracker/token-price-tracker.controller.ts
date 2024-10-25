import { Controller } from '@nestjs/common';
import { TokenPriceEntity } from '../entities/token-price.entity';

@Controller('token-price-tracker')
export class TokenPriceTrackerController {
  constructor(private readonly tokenPriceEntity: TokenPriceEntity) {}
}
