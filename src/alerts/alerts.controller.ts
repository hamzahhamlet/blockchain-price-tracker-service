import { Body, Controller, Post } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/createAlert.dto';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  postCreateAlert(@Body() body: CreateAlertDto) {
    return this.alertsService.createAlert(body);
  }
}
