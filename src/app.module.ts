import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Imports
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TokensPriceModule } from './tokens-price/tokens-price.module';

// Constants
import { typeOrmConfig } from './constants/typeOrmConfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    TokensPriceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
