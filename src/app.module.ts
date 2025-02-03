import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { DatabaseModule } from './db/db.module';

const configSchema = z.object({
  BACKEND_PORT: z.number().min(1).max(65535),
  POSTGRES_HOST: z.string().nonempty(),
  POSTGRES_PORT: z.number().min(1).max(65535),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
});

// 유효성 검사 함수를 생성합니다.
const validateConfig = (config: Record<string, unknown>) => {
  // 환경 변수를 숫자로 변환합니다.
  const parsedConfig = {
    ...config,
    BACKEND_PORT: Number(config.BACKEND_PORT),
    POSTGRES_PORT: Number(config.POSTGRES_PORT),
  };

  const result = configSchema.safeParse(parsedConfig);
  if (!result.success) {
    throw new Error(
      `Configuration validation error: ${JSON.stringify(result.error.errors)}`,
    );
  }
  return result.data;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateConfig, // 여기서 유효성 검사 함수를 사용합니다.
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
