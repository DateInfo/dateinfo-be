import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from './survey.entity';
import { Option } from './option.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  survey: Survey;

  @Column({ type: 'varchar', length: 10 })
  questionNumber: string; // "Q1", "Q2" 형식

  @Column({ type: 'text' })
  questionText: string;

  @Column({ type: 'varchar', length: 20 })
  questionType: 'short-answer' | 'multiple-choice';

  @Column({ type: 'boolean', default: false })
  isArchived: boolean; // 삭제 대신 비활성화 처리

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  options: Option[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
