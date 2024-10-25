import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  chain: string;

  @IsNumber()
  @IsNotEmpty()
  dollar: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
