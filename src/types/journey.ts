export interface JourneyStep {
  step_name: string;
  description: string;
  pain_point: string;
  emotion_score: number;
  emotion: string;
  scammer_action?: string;
}

export interface JourneyMap {
  id: string;
  author_name?: string;
  journey_title: string;
  context?: string;
  goal?: string;
  journey_id: string;
  step1_trigger: JourneyStep;
  step2_interaction: JourneyStep;
  step3_trust: JourneyStep;
  step4_turning: JourneyStep;
  step5_conclusion: JourneyStep;
  step6_aftermath: JourneyStep;
  created_at: string;
}