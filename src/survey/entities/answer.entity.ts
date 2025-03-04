import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Survey } from './survey.entity';
import { Question } from './question.entity';
import { Option } from './option.entity';
import { Member } from 'src/member/entity/member.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'member_id', referencedColumnName: 'mbr_id' }) // 💡 `mbr_id`를 참조하도록 변경
  member: Member;

  @ManyToOne(() => Survey, { onDelete: 'CASCADE' })
  survey: Survey;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  question: Question;

  // 선택형 질문 (객관식)
  @ManyToOne(() => Option, { nullable: true, onDelete: 'SET NULL' })
  selectedOption?: Option | null;

  // 단답형 질문 (주관식)
  @Column({ type: 'text', nullable: true })
  answerText?: string | null;

  @Column({ type: 'text', nullable: true })
  aiAnswer?: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
