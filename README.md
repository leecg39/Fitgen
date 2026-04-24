# FitGen

체형, 목표, 피트니스 레벨에 맞춘 개인 맞춤형 운동 플랜 생성기.
설문 3단계 → 서버가 플랜 계산 → 결과 카드로 표시.

🔗 Repository: https://github.com/leecg39/Fitgen

## 스택

- **Frontend**: React 18, Vite 4, Tailwind CSS 3, Radix UI, Framer Motion
- **Backend**: Node 20+, Fastify 4 (ESM), Zod (요청 검증)
- **Monorepo**: npm workspaces + concurrently

## 프로젝트 구조

```
.
├── apps/
│   ├── web/          React + Vite SPA (포트 3000)
│   │   └── src/
│   │       ├── components/     Hero, QuestionnaireForm, WorkoutResults 등
│   │       ├── components/ui/  shadcn 스타일 Radix 래퍼
│   │       ├── lib/
│   │       │   ├── api.js      서버 호출 래퍼
│   │       │   ├── labels.js   영문 enum → 한글 라벨 매핑
│   │       │   └── utils.js    cn() 헬퍼
│   │       └── App.jsx         landing / questionnaire / results 상태머신
│   └── api/          Fastify JSON API (포트 4000)
│       └── src/
│           ├── server.js                 Fastify 엔트리
│           └── workouts/
│               ├── schema.js             zod 입력 스키마
│               ├── exercise-library.js   운동/카디오 목업 데이터 (한글)
│               └── generate.js           플랜 생성 로직 + 단위 변환
├── package.json      workspaces 루트
└── CLAUDE.md         아키텍처/컨벤션 요약
```

## 실행

```bash
# 의존성 설치 (최초 1회)
npm install

# 개발 서버 (web + api 동시 실행)
npm run dev
# → http://localhost:3000  (web)
# → http://localhost:4000  (api, Vite proxy로도 접근 가능: /api/*)

# 프로덕션 빌드
npm run build
# → dist/apps/web/

# 빌드 프리뷰 + api 프로덕션
npm run start

# 린트
npm run lint
```

### 단일 워크스페이스 실행

```bash
npm --prefix apps/web run dev
npm --prefix apps/api run dev
```

## API

### `GET /api/health`

```json
{ "status": "ok" }
```

### `POST /api/workouts/generate`

**요청 예시**

```json
{
  "age": 30,
  "weight": 70,
  "weightUnit": "kg",
  "height": 175,
  "heightUnit": "cm",
  "goal": "muscle-gain",
  "fitnessLevel": "intermediate",
  "daysPerWeek": 4,
  "equipment": { "dumbbells": true, "barbell": false, "resistanceBands": false, "machine": false },
  "focusAreas": ["Chest", "Back"]
}
```

- `goal`: `muscle-gain` | `weight-loss` | `flexibility` | `endurance`
- `fitnessLevel`: `beginner` | `intermediate` | `advanced`
- `focusAreas`: `Chest` | `Back` | `Legs` | `Shoulders` | `Arms` | `Core` 중 복수 선택
- `weightUnit`: `kg` | `lbs` · `heightUnit`: `cm` | `ft` (서버 측에서 kg/cm로 변환 후 BMI 계산)

**응답 예시**

```json
{
  "plan": {
    "userInfo": { "age": 30, "weight": 70, "height": 175, "bmi": 22.9, ... },
    "exercises": [
      { "name": "벤치 프레스", "sets": 3, "reps": "8-10회", "rest": "90초" }
    ],
    "cardio": [
      { "name": "러닝", "duration": "30-40분", "intensity": "보통-높음" }
    ],
    "recommendations": ["매일 체중 1kg당 1.6-2.2g의 단백질을 섭취하세요.", "..."]
  }
}
```

**검증 실패**

```json
{ "error": "ValidationError", "issues": [ ... ] }   // HTTP 400
```

## 설계 메모

- **영문 enum 유지 + 한글 표시**: `Chest`, `muscle-gain`, `beginner` 같은 값은 API 스키마 안정성을 위해 영어 그대로 유지하고, 프론트의 `src/lib/labels.js` 매핑으로 한글 라벨을 표시합니다.
- **운동 데이터는 인메모리 목업**: `apps/api/src/workouts/exercise-library.js`에 하드코딩. DB/외부 API 없음. 운동/카디오/추천을 늘리려면 이 파일과 `generate.js`의 추천 규칙을 함께 편집하세요.
- **단위 변환은 서버에서**: 프론트는 `lbs`/`ft` 값을 그대로 전송, 서버가 `kg`/`cm`로 정규화 후 BMI 계산.
- **Vite proxy**: dev에서 프론트의 `/api/*` 요청은 `VITE_API_TARGET`(기본 `http://localhost:4000`)으로 포워딩됩니다.
- **Agentation 개발 도구**: 개발 모드(`import.meta.env.DEV`)에서만 렌더링됩니다.

## 한계

- 인증·사용자 계정·플랜 저장 기능 없음 (순수 비로그인 단방향 흐름)
- 테스트 스위트 없음
- `src/pages/HomePage.jsx`는 현재 사용되지 않는 파일 (라우팅 미구현)

## 라이선스

Private.
