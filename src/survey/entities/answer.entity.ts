import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Survey } from './survey.entity';
import { Question } from './question.entity';
import { Option } from './option.entity';
import { Member } from 'src/member/entity/member.entitiy';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn() // BIGINT, AUTO_INCREMENT
  id: number;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  member: Member;

  @ManyToOne(() => Survey, { onDelete: 'CASCADE' })
  survey: Survey;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  question: Question;

  @ManyToOne(() => Option, { nullable: true, onDelete: 'SET NULL' })
  selectedOption?: Option;

  @Column({ type: 'text', nullable: true })
  answerText?: string;

  @Column({ type: 'text', nullable: true })
  aiAnswer?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
