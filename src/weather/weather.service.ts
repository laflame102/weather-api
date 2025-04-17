import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import axios from 'axios';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateWeatherRequestDto } from './dto/CreateWeatherRequestDto';

@Injectable()
export class WeatherService {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  async addWeather(body: CreateWeatherRequestDto) {
    try {
      const { lat, lon, part } = body;
      // part param is only available in paid version of api, so i couldnt use it here
      //   const result = await axios.get(process.env.WEATHER_API_URL, {
      //     params: {
      //       lat,
      //       lon,
      //       part,
      //       appid: process.env.WEATHER_API_KEY,
      //     },
      //   });

      const result = await axios.get(
        `${process.env.WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`,
      );

      await this.knex.table('weather').insert({
        lat,
        lon,
        part,
        data: result.data,
      });

      return { message: 'Weather data added successfully' };
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new BadRequestException();
    }
  }

  async getWeatherData(lat: number, lon: number, part?: string) {
    try {
      const result = await this.knex
        .table('weather')
        .where({
          lat,
          lon,
          part,
        })
        .first();

      if (!result) {
        throw new HttpException('Weather data not found', HttpStatus.NOT_FOUND);
      }

      return result;
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }
      throw new BadRequestException('weather not found/');
    }
  }
}
