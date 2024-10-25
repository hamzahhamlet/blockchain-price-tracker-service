import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Imports
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { SwapModule } from './swap/swap.module';
import { AlertsModule } from './alerts/alerts.module';

// Constants
import { typeOrmConfig } from './constants/typeOrmConfig';
import { TokenPriceTrackerModule } from './token-price-tracker/token-price-tracker.module';
import { BlockchainServiceService } from './blockchain-service/blockchain-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    }),
    SwapModule,
    AlertsModule,
    TokenPriceTrackerModule,
  ],
  controllers: [AppController],
  providers: [AppService, BlockchainServiceService],
})
export class AppModule {}
