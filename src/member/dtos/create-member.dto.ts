import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  // 필수 값
  @ApiProperty({ description: '회원 이름', example: '라니안' })
  @IsNotEmpty()
  @IsString()
  mbr_name: string;

  @ApiProperty({ description: '회원 닉네임', example: '라니' })
  @IsNotEmpty()
  @IsString()
  mbr_nickname: string;

  @ApiProperty({ description: '회원 비밀번호', example: 'password123' })
  @IsNotEmpty()
  @IsString()
  mbr_pwd: string;

  @ApiProperty({ description: '회원 성별', enum: ['M', 'F'], example: 'M' })
  @IsNotEmpty()
  @IsEnum(['M', 'F'])
  mbr_gender: string;

  @ApiProperty({ description: '회원 주소1', example: '서울특별시 강남구' })
  @IsNotEmpty()
  @IsString()
  mbr_address1: string;

  @ApiProperty({ description: '회원 주소2', example: '역삼동' })
  @IsNotEmpty()
  @IsString()
  mbr_address2: string;

  @ApiProperty({ description: '회원 생일', example: '1990-01-01' })
  @IsNotEmpty()
  @IsDate()
  mbr_birth_day: Date;

  @ApiProperty({ description: '회원 이메일', example: 'example@example.com' })
  @IsNotEmpty()
  @IsEmail()
  mbr_email: string;

  @ApiProperty({ description: '회원 전화번호', example: '010-1234-5678' })
  @IsNotEmpty()
  @IsString()
  mbr_phone: string;

  // 선택 값
  @ApiHideProperty()
  // @ApiProperty({
  //   description: '회원 사진 URL',
  //   example:
  //     'https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg',
  //   required: false,
  // })
  @IsOptional()
  @IsString()
  mbr_photo?: string;

  @ApiHideProperty()
  // @ApiProperty({
  //   description: '회원 마지막 로그인 IP',
  //   example: '192.168.0.1',
  //   required: false,
  // })
  @IsOptional()
  @IsString()
  mbr_lastlogin_ip?: string;

  @ApiHideProperty()
  // @ApiProperty({
  //   description: '회원 비밀번호 마지막 변경일',
  //   example: '2025-01-01',
  //   required: false,
  // })
  @IsOptional()
  @IsDate()
  mbr_pwd_last_changed?: Date;

  @ApiHideProperty()
  // @ApiProperty({
  //   description: '회원 마지막 로그인 날짜',
  //   example: '2025-01-01',
  //   required: false,
  // })
  @IsOptional()
  @IsDate()
  mbr_lastlogin_date?: Date;
}
