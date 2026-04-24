export const exerciseLibrary = {
  Chest: {
    beginner: { name: '무릎 푸시업', sets: 3, reps: '8-12회', rest: '60초' },
    intermediate: { name: '벤치 프레스', sets: 3, reps: '8-10회', rest: '90초' },
    advanced: { name: '인클라인 덤벨 프레스', sets: 4, reps: '8-10회', rest: '90초' },
  },
  Back: {
    beginner: { name: '덤벨 로우', sets: 3, reps: '10-12회/측', rest: '60초' },
    intermediate: { name: '풀업 (보조 또는 맨몸)', sets: 3, reps: '힘 다할 때까지', rest: '90초' },
    advanced: { name: '중량 풀업', sets: 4, reps: '6-8회', rest: '120초' },
  },
  Legs: {
    beginner: { name: '맨몸 스쿼트', sets: 3, reps: '12-15회', rest: '60초' },
    intermediate: { name: '바벨 스쿼트', sets: 3, reps: '8-10회', rest: '120초' },
    advanced: { name: '불가리안 스플릿 스쿼트', sets: 4, reps: '8-10회/다리', rest: '90초' },
  },
  Shoulders: {
    beginner: { name: '파이크 푸시업', sets: 3, reps: '8-10회', rest: '60초' },
    intermediate: { name: '오버헤드 프레스 (덤벨)', sets: 3, reps: '8-10회', rest: '90초' },
    advanced: { name: '아놀드 프레스', sets: 4, reps: '8-10회', rest: '90초' },
  },
  Arms: {
    beginner: { name: '밴드 바이셉 컬', sets: 3, reps: '12-15회', rest: '45초' },
    intermediate: { name: '덤벨 바이셉 컬', sets: 3, reps: '10-12회', rest: '60초' },
    advanced: { name: '친업', sets: 4, reps: '힘 다할 때까지', rest: '90초' },
  },
  Core: {
    beginner: { name: '플랭크', sets: 3, reps: '30-45초 유지', rest: '45초' },
    intermediate: { name: '행잉 니 레이즈', sets: 3, reps: '12-15회', rest: '60초' },
    advanced: { name: '투즈 투 바', sets: 4, reps: '10-12회', rest: '90초' },
  },
};

export const cardioOptions = {
  beginner: [
    { name: '빠르게 걷기', duration: '20-30분', intensity: '보통' },
    { name: '가벼운 조깅', duration: '15-20분', intensity: '낮음-보통' },
  ],
  intermediate: [
    { name: '러닝', duration: '30-40분', intensity: '보통-높음' },
    { name: '사이클링', duration: '35-45분', intensity: '보통' },
  ],
  advanced: [
    { name: 'HIIT 스프린트', duration: '20-25분', intensity: '매우 높음' },
    { name: '장거리 러닝', duration: '45-60분', intensity: '매우 높음' },
  ],
};

export const FOCUS_AREAS = Object.keys(exerciseLibrary);
export const FITNESS_LEVELS = ['beginner', 'intermediate', 'advanced'];
export const GOALS = ['muscle-gain', 'weight-loss', 'flexibility', 'endurance'];
