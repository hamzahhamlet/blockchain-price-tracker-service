import { Controller, Get, Param } from '@nestjs/common';
import { SwapService } from './swap.service';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Get('/eth/:amount')
  getSwapRate(@Param('amount') ethAmount: string) {
    const amount = parseInt(ethAmount);
    return this.swapService.calcSwapRate(amount);
  }
}
