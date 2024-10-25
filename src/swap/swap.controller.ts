import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SwapService } from './swap.service';
import { SwapResponse } from './dto/swap.dto'

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Get('/eth/:amount')
  @ApiOperation({
    summary: 'Check the eth to btc swap rate with constant fee of 0.3%',
  })
  @ApiResponse({
    type: SwapResponse
  })
  getSwapRate(@Param('amount') ethAmount: string): Promise<SwapResponse> {
    const amount = parseInt(ethAmount);
    return this.swapService.calcSwapRate(amount);
  }
}
