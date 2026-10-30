export type GrandSlamId = 'wimbledon' | 'roland-garros' | 'australian-open' | 'us-open';

export type CourtSurface = 'grass' | 'clay' | 'cyan-hard' | 'decoturf-blue';

export type RuleCategory = 
  | 'all'
  | 'serve'
  | 'rally'
  | 'faults'
  | 'hindrance'
  | 'scoring'
  | 'equipment'
  | 'conduct';

export interface TennisRule {
  id: string;
  title: string;
  category: RuleCategory;
  tournaments: ('all' | GrandSlamId)[];
  status: 'LEGAL PLAY' | 'FAULT' | 'INFRACTION' | 'PROCEDURE';
  itfRule: string;
  summary: string;
  clauses: string[];
  umpiresNote: string;
  tags: string[];
}

export interface CourtZoneInfo {
  id: string;
  name: string;
  label: string;
  dimensions: string;
  description: string;
  tacticalNote: string;
  rulesApplied: string[];
  bounds: { x: number; y: number; width: number; height: number };
}

export interface GrandSlamTournament {
  id: GrandSlamId;
  name: string;
  shortName: string;
  founded: number;
  location: string;
  venue: string;
  surface: CourtSurface;
  surfaceTitle: string;
  surfaceComposition: string;
  colorHex: string;
  surfaceTint: string;
  borderTint: string;
  ballType: string;
  bounceHeightCm: number;
  frictionIndex: number;
  paceRating: 'Low' | 'Medium-Low' | 'Medium' | 'Medium-Fast' | 'Fast';
  keyTraditions: string[];
  specialRules: string[];
  trophyMen: string;
  trophyWomen: string;
  quote: string;
  quoteAuthor: string;
}

export interface ViolationStep {
  step: number;
  name: string;
  penalty: string;
  description: string;
  scoreImpact: string;
  supervisorRequired: boolean;
  announcementTemplate: string;
}

export interface CodeInfraction {
  id: string;
  name: string;
  category: 'Conduct' | 'Time' | 'Equipment' | 'Speech';
  severity: 'standard' | 'severe' | 'immediate-default';
  description: string;
  realWorldExample: string;
}

export interface QuizScenario {
  id: string;
  title: string;
  situation: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  officialCitation: string;
  umpiresTake: string;
}

export interface GlossaryTerm {
  term: string;
  category: 'Terminology' | 'Stroke' | 'Scoring' | 'Officiating' | 'Historical';
  definition: string;
  etymology?: string;
}
