import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from './dtos/create-member.dto';
import { Member } from './entity/member.entity';

@ApiTags('members')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 회원가입
  @Post('/signup')
  @ApiOperation({ summary: 'Create a new member' }) // API 설명 추가
  @ApiResponse({
    status: 201,
    description: 'The member has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() body: CreateMemberDto) {
    return this.memberService.create(body);
  }

  // 모든 유저 찾기
  @Get('/all')
  async getAllMembers(): Promise<Member[]> {
    return await this.memberService.getAllMembers();
  }

  // 특정 아이디로 회원찾기
  @Get('/id/:id')
  async getUserById(@Param('id') id: string) {
    return await this.memberService.findUserById(parseInt(id));
  }

  // 각 유저의 Ai 답변보기
  @Get('/aiAnswer/:id')
  @ApiOperation({ summary: '설문조사 생성' })
  @ApiParam({
    name: 'id',
    description: '조회할 AI답변의 유저 ID',
    example: 18,
  })
  @ApiResponse({
    status: 201,
    description: 'Ai답변이 조회되었습니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 오류로 인해 실패했습니다.',
  })
  async getAiAnswer(@Param('id') id: string) {
    return await this.memberService.findAiAnswer(parseInt(id));
  }
}
