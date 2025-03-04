export const SurveyRequestSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', example: '연애 성향 및 스타일 설문' },
    description: {
      type: 'string',
      example:
        '당신의 MBTI, 성격, 연애 스타일, 의사소통 및 갈등 해결 방식을 알아보는 설문조사입니다.',
    },
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          questionText: { type: 'string' },
          questionType: { type: 'string' },
          options: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                optionText: { type: 'string' },
              },
            },
          },
        },
        example: {
          questionText: '자신을 외향적/내향적이라고 생각하시나요?',
          questionType: 'multiple-choice',
          options: [
            { optionText: '외향적' },
            { optionText: '내향적' },
            { optionText: '혼합형' },
          ],
        },
      },
    },
  },
  example: {
    title: '연애 성향 및 스타일 설문',
    description:
      '당신의 MBTI, 성격, 연애 스타일, 의사소통 및 갈등 해결 방식을 알아보는 설문조사입니다.',
    questions: [
      {
        questionText: '자신을 외향적/내향적이라고 생각하시나요?',
        questionType: 'multiple-choice',
        options: [
          { optionText: '외향적' },
          { optionText: '내향적' },
          { optionText: '혼합형' },
        ],
      },
      {
        questionText: '연애를 할 때 자신을 더 논리적/감성적이라고 느끼나요?',
        questionType: 'multiple-choice',
        options: [
          { optionText: '논리적' },
          { optionText: '감성적' },
          { optionText: '상황에 따라 다름' },
        ],
      },
      {
        questionText:
          '연애에서 가장 중요한 요소는 무엇인가요? (예: 신뢰, 소통, 자유 등)',
        questionType: 'multiple-choice',
        options: [
          { optionText: '신뢰' },
          { optionText: '소통' },
          { optionText: '자유' },
          { optionText: '안정감' },
        ],
      },
      {
        questionText:
          '데이트를 계획할 때 주로 어떤 스타일을 선호하시나요? (로맨틱, 실용적, 모험적 등)',
        questionType: 'multiple-choice',
        options: [
          { optionText: '로맨틱' },
          { optionText: '실용적' },
          { optionText: '모험적' },
          { optionText: '편안한' },
        ],
      },
      {
        questionText:
          '본인이 연애할 때 주도적인 편인가요, 아니면 상대방에게 맡기는 편인가요?',
        questionType: 'multiple-choice',
        options: [
          { optionText: '주도적' },
          { optionText: '상대방에게 맡김' },
          { optionText: '상황에 따라 다름' },
        ],
      },
      {
        questionText:
          '연애 중 의견 충돌이 발생했을 때 주로 어떤 방식으로 대처하시나요?',
        questionType: 'multiple-choice',
        options: [
          { optionText: '즉시 대화' },
          { optionText: '시간을 두고 생각' },
          { optionText: '감정적으로 대응' },
          { optionText: '회피' },
        ],
      },
      {
        questionText:
          '상대방과의 대화에서 가장 중요하게 생각하는 점은 무엇인가요? (경청, 솔직함, 공감 등)',
        questionType: 'multiple-choice',
        options: [
          { optionText: '경청' },
          { optionText: '솔직함' },
          { optionText: '공감' },
          { optionText: '유머' },
        ],
      },
      {
        questionText:
          '갈등 상황에서 문제 해결을 위해 가장 선호하는 방법은 무엇인가요?',
        questionType: 'multiple-choice',
        options: [
          { optionText: '대화와 타협' },
          { optionText: '시간을 두고 감정 정리 후 대화' },
          { optionText: '제3자의 도움' },
        ],
      },
      {
        questionText:
          '갈등 후에 어떻게 화해하는 편이신가요? (예: 바로 대화, 시간을 두고 생각 등)',
        questionType: 'multiple-choice',
        options: [
          { optionText: '바로 대화' },
          { optionText: '시간을 두고 생각' },
          { optionText: '적절한 거리 두기 후 연락' },
        ],
      },
      {
        questionText:
          '연애 중 자신은 어떤 방식으로 애정을 표현하는 편인가요? (말, 행동, 선물 등)',
        questionType: 'multiple-choice',
        options: [
          { optionText: '말' },
          { optionText: '행동' },
          { optionText: '선물' },
          { optionText: '시간 투자' },
        ],
      },
      {
        questionText: '상대방에게서 기대하는 애정 표현 방식은 무엇인가요?',
        questionType: 'multiple-choice',
        options: [
          { optionText: '말' },
          { optionText: '행동' },
          { optionText: '선물' },
          { optionText: '시간 투자' },
        ],
      },
      {
        questionText:
          '장기적인 관계와 단기적인 만남 중 어떤 것을 선호하시나요?',
        questionType: 'multiple-choice',
        options: [
          { optionText: '장기적 관계' },
          { optionText: '단기적 만남' },
          { optionText: '상황에 따라 다름' },
        ],
      },
      {
        questionText: '상대방의 MBTI 유형이 연애 선택에 영향을 미치나요?',
        questionType: 'multiple-choice',
        options: [
          { optionText: '예' },
          { optionText: '아니오' },
          { optionText: '잘 모르겠다' },
        ],
      },
      {
        questionText:
          'MBTI 유형에 대해 평소 어떻게 생각하시나요? (예: 성격을 잘 설명한다고 느끼는지 등)',
        questionType: 'short-answer',
      },
      {
        questionText:
          'MBTI 유형이 다른 사람과의 연애에서 예상되는 장단점은 무엇이라고 생각하시나요?',
        questionType: 'short-answer',
      },
      {
        questionText:
          '본인의 MBTI 유형이 연애 스타일에 어떤 영향을 미친다고 생각하시나요?',
        questionType: 'short-answer',
      },
      {
        questionText:
          '이상적인 연애 관계에서 두 사람이 서로 어떤 역할을 분담하는 것이 좋다고 생각하시나요?',
        questionType: 'short-answer',
      },
      {
        questionText: '본인의 MBTI 유형은 무엇인가요?',
        questionType: 'short-answer',
      },
      {
        questionText:
          '연애를 통해 얻고자 하는 것은 무엇인가요? (예: 안정감, 성취감, 자기 발전 등)',
        questionType: 'short-answer',
      },
      {
        questionText:
          '이상적인 파트너의 MBTI 유형에 대해 어떤 기준을 가지고 계신가요?',
        questionType: 'short-answer',
      },
    ],
  },
};
