import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '나&박의 연애정보회사의 Secret API에 접근하셨습니다!';
  }
}
