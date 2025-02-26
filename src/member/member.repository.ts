import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Member } from './entity/member.entitiy';

@Injectable()
export class MemberRepository extends Repository<Member> {
  constructor(private dataSource: DataSource) {
    super(Member, dataSource.createEntityManager());
  }

  // 특정 ID로 회원 찾기
  async findById(mbr_id: number): Promise<Member | null> {
    return this.findOne({ where: { mbr_id } });
  }

  // 모든 회원 조회
  async findAll(): Promise<Member[]> {
    return this.find();
  }
}
