import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  private readonly makeWebhookUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.makeWebhookUrl = this.configService.get<string>(
      'MAKE_WEBHOOK_URL',
      '',
    );
    if (!this.makeWebhookUrl) {
      this.logger.error('Make.com Webhook URL이 설정되지 않았습니다.');
    } else {
      this.logger.log(`Make.com Webhook URL: ${this.makeWebhookUrl}`);
    }
  }

  async sendToMakeWebhook(data: any): Promise<void> {
    if (!this.makeWebhookUrl) {
      this.logger.error(
        'Make.com Webhook URL이 설정되지 않아 Webhook 전송을 중단합니다.',
      );
      return;
    }

    try {
      await lastValueFrom(this.httpService.post(this.makeWebhookUrl, data));
      this.logger.log(`Make.com Webhook 전송 성공: ${JSON.stringify(data)}`);
    } catch (error: unknown) {
      this.logger.error(
        `Make.com Webhook 요청 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    }
  }
}
