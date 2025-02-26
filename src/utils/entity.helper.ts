import { ObjectLiteral, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export async function getEntityOrThrow<T extends ObjectLiteral>(
  repository: Repository<T>,
  criteria: object,
  notFoundMessage: string,
): Promise<T> {
  const entity = await repository.findOne({ where: criteria });
  if (!entity) {
    throw new NotFoundException(notFoundMessage);
  }
  return entity;
}
