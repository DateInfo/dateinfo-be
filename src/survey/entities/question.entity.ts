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
  @PrimaryGeneratedColumn() // BIGINT, AUTO_INCREMENT
  id: number;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  survey: Survey;

  @Column({ type: 'text' })
  questionText: string;

  @Column({ type: 'varchar', length: 20 })
  questionType: 'short-answer' | 'multiple-choice';

  @Column({ type: 'boolean', default: false })
  isArchived: boolean;

  @OneToMany(() => Option, (option) => option.question, { cascade: true })
  options: Option[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
