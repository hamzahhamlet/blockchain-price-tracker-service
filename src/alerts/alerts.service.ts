import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlertDto } from './dto/createAlert.dto';
import { AlertsEntity } from '../entities/alerts.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(AlertsEntity)
    private readonly alertsEntity: Repository<AlertsEntity>,
  ) {}

  async createAlert(body: CreateAlertDto): Promise<AlertsEntity> {
    try {
      const alert = this.alertsEntity.create(body);
      return await this.alertsEntity.save(alert);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
