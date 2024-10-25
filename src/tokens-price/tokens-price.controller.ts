import { Controller } from '@nestjs/common';
import { TokensPriceService } from './tokens-price.service';

@Controller('tokens-price')
export class TokensPriceController {
  constructor(private readonly tokensPriceService: TokensPriceService) {}
}
