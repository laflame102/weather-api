import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class FormatWeatherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const sys = data?.data?.sys || {};
        const main = data?.data?.main || {};
        const wind = data?.data?.wind || {};

        return {
          sunrise: sys.sunrise ?? null,
          sunset: sys.sunset ?? null,
          temp: main.temp ?? null,
          feels_like: main.feels_like ?? null,
          pressure: main.pressure ?? null,
          humidity: main.humidity ?? null,
          wind_speed: wind.speed ?? null,
        };
      }),
    );
  }
}
