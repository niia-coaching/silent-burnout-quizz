import { BatteryType, BatteryScore, AssessmentResults } from '../types';
import { getScoreLevel, getProfile } from '../data/batteries';
import { getAllBatteries } from '../data/questions';

export const calculateBatteryScore = (
  battery: BatteryType,
  answers: Record<string, number>
): BatteryScore => {
  const batteryQuestions = Object.keys(answers).filter(qId => 
    qId.startsWith(getBatteryPrefix(battery))
  );
  
  const score = batteryQuestions.reduce((sum, qId) => sum + answers[qId], 0);
  const level = getScoreLevel(score);
  const percentage = Math.round((score / 30) * 100);
  
  return { battery, score, level, percentage };
};

export const calculateResults = (
  firstName: string,
  answers: Record<string, number>
): AssessmentResults => {
  const batteries = getAllBatteries();
  const scores = batteries.map(battery => 
    calculateBatteryScore(battery, answers)
  );
  
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
  const totalPercentage = Math.round((totalScore / 210) * 100);
  const profile = getProfile(totalScore);
  
  return {
    firstName,
    scores,
    totalScore,
    totalPercentage,
    profile
  };
};

const getBatteryPrefix = (battery: BatteryType): string => {
  const prefixes: Record<BatteryType, string> = {
    physical: 'phys',
    mental: 'ment',
    emotional: 'emot',
    identity: 'iden',
    relational: 'rela',
    professional: 'prof',
    spiritual: 'spir'
  };
  return prefixes[battery];
};

