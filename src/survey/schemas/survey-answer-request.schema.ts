export const SurveyAnswerRequestSchema = {
  type: 'object',
  properties: {
    memberId: { type: 'number', example: 18 },
    surveyId: { type: 'number', example: 5 },
    answers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          questionId: { type: 'number', example: 32 },
          selectedOptionId: { type: 'number', nullable: true, example: 64 },
          answerText: {
            type: 'string',
            nullable: true,
            example: 'MBTI가 성격을 설명하는 데 도움이 됩니다.',
          },
        },
      },
    },
  },
  example: {
    memberId: 18,
    surveyId: 5,
    answers: [
      { questionId: 32, selectedOptionId: 64 },
      { questionId: 33, selectedOptionId: 68 },
      { questionId: 34, selectedOptionId: 70 },
      { questionId: 35, selectedOptionId: 74 },
      { questionId: 36, selectedOptionId: 78 },
      { questionId: 38, selectedOptionId: 81 },
      { questionId: 39, selectedOptionId: 85 },
      { questionId: 40, selectedOptionId: 89 },
      { questionId: 41, selectedOptionId: 92 },
      { questionId: 42, selectedOptionId: 95 },
      { questionId: 43, selectedOptionId: 99 },
      { questionId: 45, selectedOptionId: 103 },
      { questionId: 48, selectedOptionId: 106 },
      {
        questionId: 31,
        answerText: 'MBTI가 성격을 설명하는 데 도움이 됩니다.',
      },
      {
        questionId: 47,
        answerText:
          'MBTI 차이로 갈등이 생길 수도 있지만, 서로 배울 점도 많아요.',
      },
      {
        questionId: 46,
        answerText:
          '제 MBTI가 감성적이라 연애할 때 상대의 감정을 많이 배려해요.',
      },
      {
        questionId: 37,
        answerText: '서로의 강점을 살려 역할을 나누면 좋겠어요.',
      },
      { questionId: 30, answerText: 'INFJ' },
      { questionId: 44, answerText: '안정감과 자기 성장' },
      {
        questionId: 49,
        answerText: '상대방의 MBTI가 저와 상호 보완적이길 원해요.',
      },
    ],
  },
};
