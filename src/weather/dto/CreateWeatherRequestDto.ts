import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWeatherRequestDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;

  @IsString()
  @IsOptional()
  part?: string;
}
