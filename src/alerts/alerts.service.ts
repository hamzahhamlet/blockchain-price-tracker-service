import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlertsEntity } from './entity/alerts.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(AlertsEntity)
    private readonly alertsEntity: Repository<AlertsEntity>,
  ) {}
}
