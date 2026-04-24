import React from 'react';
import { Dumbbell, Flame, Leaf } from 'lucide-react';

const workoutCategories = [
  {
    title: '바디 빌딩',
    description: '타깃 근육 성장 프로그램으로 체형을 다듬고 강화해 보세요.',
    icon: <Dumbbell className="h-10 w-10 text-[#B1F82A]" />,
    intensity: [
      { label: '근력', value: 90 },
      { label: '근비대', value: 75 },
      { label: '유산소', value: 25 },
    ],
  },
  {
    title: '칼로리 연소',
    description: '고강도 유산소와 서킷 트레이닝으로 신진대사를 올리고 군살을 태우세요.',
    icon: <Flame className="h-10 w-10 text-[#B1F82A]" />,
    intensity: [
      { label: '유산소', value: 95 },
      { label: 'HIIT', value: 85 },
      { label: '지구력', value: 70 },
    ],
  },
  {
    title: '전신 유연성',
    description: '다이내믹 스트레칭으로 가동 범위를 넓히고 경직을 풀어 회복력을 높여 보세요.',
    icon: <Leaf className="h-10 w-10 text-[#B1F82A]" />,
    intensity: [
      { label: '가동성', value: 90 },
      { label: '스트레칭', value: 80 },
      { label: '밸런스', value: 65 },
    ],
  },
];

const IntensityBar = ({ label, value }) => {
  return (
    <div className="w-full text-left">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">{label}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div className="bg-[#1e04fb] h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

const WorkoutTypes = () => {
  return (
    <section className="bg-[#0C0C0C] py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            다양한 <span className="text-[#B1F82A]">운동 유형</span>을 만나보세요
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            목표에 가장 잘 맞는 훈련 스타일을 찾아보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {workoutCategories.map((category, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 flex flex-col transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                <p className="mt-2 text-gray-300 flex-grow">{category.description}</p>
              </div>

              <div className="w-full mt-6 mb-8 space-y-4">
                {category.intensity.map((item) => (
                  <IntensityBar key={item.label} label={item.label} value={item.value} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutTypes;
