import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AlertsEntity } from './entity/alerts.entity';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlertsEntity])],
  controllers: [AlertsController],
  providers: [AlertsService],
})
export class AlertsModule {}
