import { BatteryType, BatteryInfo, ScoreLevel } from '../types';

export const batteryInfo: Record<BatteryType, BatteryInfo> = {
  physical: {
    name: 'Physique',
    icon: 'Battery',
    emoji: '🔋',
    color: '#a5826f' // NIIA Copper
  },
  mental: {
    name: 'Mentale',
    icon: 'Brain',
    emoji: '🧠',
    color: '#1c3b5a' // NIIA Blue Dark
  },
  emotional: {
    name: 'Émotionnelle',
    icon: 'Heart',
    emoji: '💙',
    color: '#379191' // NIIA Teal
  },
  identity: {
    name: 'Identitaire',
    icon: 'User',
    emoji: '👤',
    color: '#827268' // NIIA Brown
  },
  relational: {
    name: 'Relationnelle',
    icon: 'Users',
    emoji: '🤝',
    color: '#dea742' // NIIA Gold
  },
  professional: {
    name: 'Professionnelle',
    icon: 'Briefcase',
    emoji: '💼',
    color: '#1c576e' // NIIA Teal Dark
  },
  spiritual: {
    name: 'Spirituelle',
    icon: 'Sparkles',
    emoji: '🕊',
    color: '#7e8081' // NIIA Gray
  }
};

export const getScoreLevel = (score: number): ScoreLevel => {
  if (score <= 10) return 'critical';
  if (score <= 20) return 'unstable';
  return 'optimal';
};

export const getLevelColor = (level: ScoreLevel): string => {
  switch (level) {
    case 'critical':
      return '#d96536'; // Terracotta - NIIA brand
    case 'unstable':
      return '#dea742'; // Ambre - NIIA brand
    case 'optimal':
      return '#379191'; // Sarcelle - NIIA brand
  }
};

export const getLevelEmoji = (level: ScoreLevel): string => {
  switch (level) {
    case 'critical':
      return '🔴';
    case 'unstable':
      return '🟡';
    case 'optimal':
      return '🟢';
  }
};

export const getLevelLabel = (level: ScoreLevel): string => {
  switch (level) {
    case 'critical':
      return 'CRITIQUE';
    case 'unstable':
      return 'INSTABLE';
    case 'optimal':
      return 'OPTIMAL';
  }
};

export const getProfile = (totalScore: number): string => {
  const percentage = (totalScore / 210) * 100;
  
  if (percentage < 35) {
    return 'Épuisement Critique - Besoin Urgent de Soutien';
  } else if (percentage < 55) {
    return 'Fatigue Profonde - En Transition';
  } else if (percentage < 70) {
    return 'Équilibre Fragile - En Reconstruction';
  } else if (percentage < 85) {
    return 'Énergie Stable - En Progression';
  } else {
    return 'Vitalité Optimale - Excellence Durable';
  }
};

