import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  mbr_name: string;

  @IsNotEmpty()
  @IsString()
  mbr_nickname: string;

  @IsNotEmpty()
  @IsString()
  mbr_pwd: string;

  @IsNotEmpty()
  @IsEnum(['M', 'F'])
  mbr_gender: string;

  @IsNotEmpty()
  @IsString()
  mbr_address1: string;

  @IsNotEmpty()
  @IsString()
  mbr_address2: string;

  @IsNotEmpty()
  @IsDate()
  mbr_birth_day: Date;

  @IsNotEmpty()
  @IsEmail()
  mbr_email: string;

  @IsNotEmpty()
  @IsString()
  mbr_phone: string;

  @IsOptional()
  @IsString()
  mbr_photo?: string;

  @IsOptional()
  @IsString()
  mbr_lastlogin_ip?: string;

  @IsOptional()
  @IsDate()
  mbr_pwd_last_changed?: Date;

  @IsOptional()
  @IsDate()
  mbr_lastlogin_date?: Date;
}
