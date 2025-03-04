import { Member } from 'src/member/entity/member.entity';

export function buildWebhookData(member: Member): Record<string, any> {
  return {
    mbr_id: member.mbr_id,
    mbr_email: member.mbr_email,
    mbr_nickname: member.mbr_nickname,
    mbr_name: member.mbr_name,
    mbr_lastlogin_date: new Date().toISOString(),
  };
}
