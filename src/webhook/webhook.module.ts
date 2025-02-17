import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WebhookService } from './webhook.service';

@Module({
  imports: [
    HttpModule.register({}), // ✅ HttpService가 전역에서 사용 가능하도록 설정
  ],
  providers: [WebhookService], // WebhookService 등록
  exports: [WebhookService], // 다른 모듈에서도 사용 가능하도록 export
})
export class WebhookModule {}
