/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;

    const start = Date.now();

    this.logger.log(`📥 [${method}] ${url} - Body: ${JSON.stringify(body)}`);

    return next.handle().pipe(
      tap((responseData) => {
        const duration = Date.now() - start;
        this.logger.log(
          `📤 [${method}] ${url} - ${duration}ms - Response: ${JSON.stringify(responseData)}`,
        );
      }),
    );
  }
}
