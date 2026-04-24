import React from 'react';
import { CheckCircle, Target, TrendingUp } from 'lucide-react';

const features = [
  {
    number: '01',
    title: '맞춤형 플랜',
    description: '당신의 체형, 목표, 피트니스 레벨에 맞춰 설계된 운동 루틴을 제공합니다.',
    icon: <CheckCircle className="h-8 w-8 text-[#B1F82A]" />,
  },
  {
    number: '02',
    title: '목표를 달성하세요',
    description: '근육 증가, 체중 감량, 유연성까지 — 원하는 목표에 더 빠르게 도달하도록 돕습니다.',
    icon: <Target className="h-8 w-8 text-[#B1F82A]" />,
  },
  {
    number: '03',
    title: '진행 상황을 추적하세요',
    description: '직관적인 추적 도구로 성장을 확인하고 꾸준히 동기를 유지하세요.',
    icon: <TrendingUp className="h-8 w-8 text-[#B1F82A]" />,
  },
];

const Features = () => {
  return (
    <section className="bg-[#0C0C0C] py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            왜 <span className="text-[#B1F82A]">FitGen</span>인가요?
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            오직 당신만을 위해 설계된 운동 플랜의 차이를 경험해 보세요.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 flex flex-col items-start text-left transition-all duration-300"
            >
              <div className="absolute top-0 left-0 -mt-4 -ml-4 h-16 w-16 flex items-center justify-center rounded-full bg-[#B1F82A] text-black text-2xl font-bold shadow-md">
                {feature.number}
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
