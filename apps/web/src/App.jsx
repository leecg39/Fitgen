import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import QuestionnaireForm from '@/components/QuestionnaireForm';
import WorkoutResults from '@/components/WorkoutResults';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import Features from '@/components/Features';
import LogoCloud from '@/components/LogoCloud';
import WorkoutTypes from '@/components/WorkoutTypes';
import Trainers from '@/components/Trainers';
import BentoGrid from '@/components/BentoGrid';
import CallToAction from '@/components/CallToAction';
import { generateWorkoutPlan } from '@/lib/api';
import { Agentation } from 'agentation';

function App() {
  const { toast } = useToast();
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [initialGender, setInitialGender] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStartQuestionnaire = (gender) => {
    setInitialGender(gender);
    setShowQuestionnaire(true);
    setWorkoutPlan(null);
  };

  const handleQuestionnaireComplete = async (data) => {
    setIsGenerating(true);
    try {
      const plan = await generateWorkoutPlan(data);
      setWorkoutPlan(plan);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '운동 플랜을 생성하지 못했습니다.',
        description: error.message || '잠시 후 다시 시도해 주세요.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setShowQuestionnaire(false);
    setWorkoutPlan(null);
    setInitialGender(null);
  };

  return (
    <>
      <Helmet>
        <title>FitGen — 맞춤형 운동 플랜 생성기</title>
        <meta
          name="description"
          content="나이, 체중, 피트니스 레벨, 목표에 맞춘 개인 맞춤형 운동 플랜을 만들어 보세요. 오늘 바로 피트니스 여정을 시작하세요!"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="min-h-screen bg-[#0C0C0C] overflow-hidden">
        <main>
          <AnimatePresence mode="wait">
            {!showQuestionnaire && !workoutPlan && (
              <div key="landing">
                <Hero onStart={handleStartQuestionnaire} />
                <Features />
                <WorkoutTypes />
                <Trainers />
                <BentoGrid />
                <LogoCloud />
                <CallToAction onStart={handleStartQuestionnaire} />
              </div>
            )}

            {showQuestionnaire && !workoutPlan && (
              <QuestionnaireForm
                key="questionnaire"
                onComplete={handleQuestionnaireComplete}
                onBack={handleReset}
                initialGender={initialGender}
                isSubmitting={isGenerating}
              />
            )}

            {workoutPlan && (
              <WorkoutResults key="results" workoutPlan={workoutPlan} onReset={handleReset} />
            )}
          </AnimatePresence>
        </main>

        <Toaster />
        {import.meta.env.DEV && <Agentation />}
      </div>
    </>
  );
}

export default App;
