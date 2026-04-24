import { exerciseLibrary, cardioOptions } from './exercise-library.js';

const toKg = (weight, unit) => (unit === 'lbs' ? Number((weight * 0.453592).toFixed(1)) : Number(weight));

const toCm = (height, unit) => {
  if (unit === 'cm') return Number(height);
  if (typeof height === 'string' && height.includes('ft')) {
    const [feetPart, inchPart] = height.split('ft');
    const feet = parseInt(feetPart, 10) || 0;
    const inches = parseInt((inchPart || '').replace('in', ''), 10) || 0;
    return Number(((feet * 12 + inches) * 2.54).toFixed(1));
  }
  return Number(height);
};

const buildRecommendations = ({ age, goal }, bmi) => {
  const out = [];
  if (bmi < 18.5) {
    out.push('근력 운동에 집중하고, 근육 성장을 위해 약간의 칼로리 잉여를 고려해 보세요.');
  } else if (bmi > 25) {
    out.push('체중 관리를 위해 근력 운동과 규칙적인 유산소를 함께 진행하세요.');
  }
  if (age > 50) {
    out.push('루틴에 유연성과 균형 운동을 꼭 포함하세요.');
    out.push('부상 예방을 위해 충분한 워밍업과 쿨다운을 반드시 진행하세요.');
  }
  if (goal === 'weight-loss') {
    out.push('하루 300-500kcal 수준의 꾸준한 칼로리 결핍을 유지하세요.');
    out.push('효율적인 칼로리 연소를 위해 고강도 인터벌 트레이닝(HIIT)을 우선적으로 활용하세요.');
  } else if (goal === 'muscle-gain') {
    out.push('매일 체중 1kg당 1.6-2.2g의 단백질을 섭취하세요.');
    out.push('점진적 과부하가 핵심입니다 — 시간이 지남에 따라 무게·횟수·세트를 조금씩 늘려 가세요.');
  }
  out.push('매일 최소 8잔(약 2-3리터)의 물을 마셔 수분을 충분히 유지하세요.');
  out.push('최상의 회복과 수행력을 위해 매일 7-9시간의 질 좋은 수면을 확보하세요.');
  return out;
};

export const generateWorkout = (input) => {
  const weightKg = toKg(input.weight, input.weightUnit);
  const heightCm = toCm(input.height, input.heightUnit);
  const bmi = Number((weightKg / (heightCm / 100) ** 2).toFixed(1));

  const level = input.fitnessLevel;
  const selected = input.focusAreas.map((area) => exerciseLibrary[area][level] || exerciseLibrary[area].beginner);
  const exercises = selected.length > 0 ? selected : [exerciseLibrary.Legs[level]];

  return {
    userInfo: { ...input, weight: weightKg, height: heightCm, bmi },
    exercises,
    cardio: cardioOptions[level] || cardioOptions.beginner,
    recommendations: buildRecommendations(input, bmi),
  };
};
