export type BatteryType = 
  | 'physical'
  | 'mental'
  | 'emotional'
  | 'identity'
  | 'relational'
  | 'professional'
  | 'spiritual';

export type ScoreLevel = 'critical' | 'unstable' | 'optimal';

export interface Question {
  id: string;
  battery: BatteryType;
  text: string;
  options: {
    text: string;
    points: number;
    example: string;
  }[];
}

export interface BatteryScore {
  battery: BatteryType;
  score: number;
  level: ScoreLevel;
  percentage: number;
}

export interface AssessmentResults {
  firstName: string;
  scores: BatteryScore[];
  totalScore: number;
  totalPercentage: number;
  profile: string;
}

export interface BatteryInfo {
  name: string;
  icon: string;
  emoji: string;
  color: string;
}

