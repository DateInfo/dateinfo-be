import { Answer } from 'src/survey/entities/answer.entity';

export function buildWebhookData(answer: Answer): Record<string, any> {
  return {
    answerId: answer.id,
    surveyId: answer.survey.id,
    questionId: answer.question.id,
    selectedOptionId: answer.selectedOption?.id ?? null,
    answerText: answer.answerText,
    aiAnswer: answer.aiAnswer,
    memberId: answer.member.mbr_id,
    createdAt: answer.createdAt.toISOString(),
  };
}
