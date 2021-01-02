import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  loginUser(): string {
    return 'Hello World!';
  }
}
