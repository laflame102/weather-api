import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { FormatWeatherInterceptor } from './interceptors/response.interceptor';
import { CreateWeatherRequestDto } from './dto/CreateWeatherRequestDto';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post('get-data-and-store')
  addWeather(@Body() body: CreateWeatherRequestDto) {
    return this.weatherService.addWeather(body);
  }

  @UseInterceptors(FormatWeatherInterceptor)
  @Get('get-weather-data')
  getWeatherData(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('part') part?: string,
  ) {
    return this.weatherService.getWeatherData(lat, lon, part);
  }
}
