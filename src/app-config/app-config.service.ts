import { Country } from './../movies/movie.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  getAppConfig() {
    return {
      Country,
    };
  }
}