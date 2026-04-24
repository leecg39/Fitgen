import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, RefreshCw, Target } from 'lucide-react';
import { focusAreaLabels, goalLabels, fitnessLevelLabels, toKoreanLabel } from '@/lib/labels';

const WorkoutResults = ({ workoutPlan, onReset }) => {
  const resultsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  if (!workoutPlan) {
    return null;
  }

  const { userInfo, exercises, cardio, recommendations } = workoutPlan;
  const focusAreasKorean = (userInfo.focusAreas || []).map((a) => toKoreanLabel(focusAreaLabels, a)).join(', ');

  return (
    <motion.div
      variants={resultsVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0C0C0C]"
    >
      <div className="w-full max-w-4xl bg-gray-900/50 border border-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          당신만의 <span className="text-[#B1F82A]">운동 플랜</span>
        </h2>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="bg-gray-800/70 p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#B1F82A] mb-4 flex items-center">
              <CheckCircle className="mr-2" /> 프로필
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-300">
              {userInfo.gender && <p><strong>성별:</strong> {userInfo.gender}</p>}
              <p><strong>나이:</strong> {userInfo.age}</p>
              <p><strong>체중:</strong> {userInfo.weight} kg</p>
              <p><strong>키:</strong> {userInfo.height} cm</p>
              <p><strong>BMI:</strong> {userInfo.bmi}</p>
              <p><strong>목표:</strong> {toKoreanLabel(goalLabels, userInfo.goal)}</p>
              <p><strong>피트니스 레벨:</strong> {toKoreanLabel(fitnessLevelLabels, userInfo.fitnessLevel)}</p>
              <p><strong>집중 부위:</strong> {focusAreasKorean}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-800/70 p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#B1F82A] mb-4 flex items-center">
              <Target className="mr-2" /> 집중 근력 훈련
            </h3>
            <ul className="space-y-3 text-gray-300">
              {exercises.map((exercise, index) => (
                <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 py-2 last:border-b-0">
                  <span className="font-semibold">{exercise.name}</span>
                  <span className="text-gray-400 text-sm sm:text-right">{exercise.sets}세트 × {exercise.reps} (휴식 {exercise.rest})</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-800/70 p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#B1F82A] mb-4 flex items-center">
              <Heart className="mr-2" /> 유산소
            </h3>
            <ul className="space-y-3 text-gray-300">
              {cardio.map((c, index) => (
                <li key={index} className="flex justify-between items-center border-b border-gray-700 pb-2 last:border-b-0">
                  <span>{c.name}</span>
                  <span className="text-gray-400">{c.duration} ({c.intensity})</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-800/70 p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#B1F82A] mb-4 flex items-center">
              <RefreshCw className="mr-2" /> 추천 사항
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 text-center">
          <Button
            onClick={onReset}
            className="px-8 py-4 text-lg font-semibold rounded-full bg-[#B1F82A] text-black hover:bg-[#B1F82A]/90 transition-all duration-300 shadow-lg"
          >
            새 플랜 만들기
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkoutResults;
