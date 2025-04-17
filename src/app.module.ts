import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import knexConfig from 'knexfile';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    WeatherModule,
    KnexModule.forRoot({ config: knexConfig }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
