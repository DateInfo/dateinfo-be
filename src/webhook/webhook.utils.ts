import { Member } from 'src/member/entity/member.entitiy';

export function buildWebhookData(member: Member): Record<string, any> {
  return {
    mbr_id: member.mbr_id,
    mbr_email: member.mbr_email,
    mbr_name: member.mbr_name,
    mbr_lastlogin_date: new Date().toISOString(),
  };
}
