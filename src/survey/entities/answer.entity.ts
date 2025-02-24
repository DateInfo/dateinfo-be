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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Survey, { onDelete: 'CASCADE' })
  survey: Survey;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  question: Question;

  @ManyToOne(() => Option, { nullable: true, onDelete: 'SET NULL' })
  selectedOption?: Option; // 객관식 응답

  @Column({ type: 'text', nullable: true })
  answerText?: string; // 주관식 응답

  @CreateDateColumn()
  createdAt: Date;
}
