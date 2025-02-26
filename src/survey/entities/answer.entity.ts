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

@Entity()
export class Answer {
  @PrimaryGeneratedColumn() // BIGINT, AUTO_INCREMENT
  id: number;

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
