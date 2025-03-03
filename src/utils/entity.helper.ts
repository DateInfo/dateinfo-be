import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';

const logger = new Logger('EntityHelper');

export async function getEntityOrThrow<T extends ObjectLiteral>(
  repository: Repository<T>,
  criteria: FindOptionsWhere<T>,
  notFoundMessage: string,
  relations?: string[],
): Promise<T> {
  const entity = await repository.findOne({
    where: criteria,
    relations: relations ?? undefined,
  });
  if (!entity) {
    logger.warn(
      `❌ Entity not found - ${notFoundMessage} / criteria: ${JSON.stringify(criteria)}`,
    );
    throw new NotFoundException(notFoundMessage);
  }
  return entity;
}
/**
 * 해당 함수 사용시
 * 제네릭 + 외부 라이브러리(TypeORM) + NestJS 조합에서 eslint가 '타입 추론 실패' 가능
 * 
 * {
     // 제네릭 + 외부 라이브러리(TypeORM) + NestJS 조합에서 eslint가 타입 추론 실패
     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
 * }
 * eslint의 타입 추론 실패시, 추론 실패 부분에 위 코드 적용
 */
