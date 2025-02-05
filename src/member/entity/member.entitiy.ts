import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Member')
export class Member {
  // 필수 입력 값
  @PrimaryGeneratedColumn()
  mbr_id: number;

  @Column({ type: 'varchar', length: 50 })
  mbr_name: string;

  @Column({ type: 'varchar', length: 225 })
  mbr_nickname: string;

  @Column({ type: 'varchar', length: 100 })
  mbr_pwd: string;

  @Column({
    type: 'enum',
    enum: ['M', 'F'],
  })
  mbr_gender: string;

  @Column({ type: 'varchar', length: 225 })
  mbr_address1: string;

  @Column({ type: 'varchar', length: 225 })
  mbr_address2: string;

  @Column({
    type: 'enum',
    enum: ['REGULAR', 'KAKAO', 'GOOGLE', 'NAVER', 'GUEST'],
    default: 'REGULAR',
  })
  mbr_type: string;

  @Column({
    type: 'enum',
    enum: ['NORMAL', 'REST', 'STOP'],
    default: 'NORMAL',
  })
  mbr_stat: string;

  @Column({ type: 'date' })
  mbr_birth_day: Date;

  @Column({ type: 'varchar', length: 20 })
  mbr_phone: string;

  @Column({ type: 'varchar', length: 100 })
  mbr_email: string;

  // 기본 값
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  mbr_register_date: Date;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  // Nullable
  @Column({ type: 'varchar', length: 225, nullable: true })
  mbr_photo: string | null;

  @Column({ type: 'varchar', length: 225, nullable: true })
  mbr_lastlogin_ip: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  mbr_pwd_last_changed: Date;

  @Column({ type: 'timestamp', nullable: true })
  mbr_lastlogin_date: Date | null;

  //   @Column({ type: 'enum', enum: ['Y', 'N'] })
  //   mbr_svc_use_pcy_agmt_yn: string;

  //   @Column({ type: 'enum', enum: ['Y', 'N'] })
  //   mbr_info_proc_agmt_yn: string;

  //   @Column({ type: 'enum', enum: ['Y', 'N'] })
  //   mbr_loc_base_svc_agmt_yn: string;

  //   @Column({ type: 'enum', enum: ['Y', 'N'] })
  //   mbr_mkt_info_recv_agmt_yn: string;

  //   @Column({ type: 'enum', enum: ['Y', 'N'] })
  //   mbr_news_feed_push_yn: string;

  //   @Column({ type: 'enum', enum: ['Y', 'N'] })
  //   mbr_ntc_push_yn: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Member');
    // console.table([{ id: this.mbr_id, name: this.mbr_name }]);
    console.table([this]);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Member with id', this.mbr_id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Member with id', this.mbr_id);
  }
}
