/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Catch,
  ArgumentsHost,
  BadRequestException,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    this.logger.error(
      `🚨 Validation Error - [${request.method}] ${request.url}\n` +
        `Body: ${JSON.stringify(request.body)}\n` +
        `Error: ${JSON.stringify(exception.getResponse())}`,
    );

    response.status(exception.getStatus()).json(exception.getResponse());
  }
}
