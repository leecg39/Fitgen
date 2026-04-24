export const focusAreaLabels = {
  Chest: '가슴',
  Back: '등',
  Legs: '하체',
  Shoulders: '어깨',
  Arms: '팔',
  Core: '코어',
};

export const goalLabels = {
  'muscle-gain': '근육 증가',
  'weight-loss': '체중 감량',
  flexibility: '유연성',
  endurance: '지구력',
};

export const fitnessLevelLabels = {
  beginner: '초급',
  intermediate: '중급',
  advanced: '고급',
};

export const equipmentLabels = {
  dumbbells: '덤벨',
  barbell: '바벨',
  resistanceBands: '저항 밴드',
  machine: '헬스장 머신',
};

export const toKoreanLabel = (map, value) => map[value] || value;
