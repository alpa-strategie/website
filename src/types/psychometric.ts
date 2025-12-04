export interface PsychometricMetadata {
  name: string;
  type: string;
  factor: string;
  facetName: string;
  scoreT: string;
  rawScore: string;
  interpretation: string;
  impactOnWork: string;
  strengthCategory: string;
  archetypeMapping: string;
  keywordsForAI: string;
}

export interface PsychometricProfilePage {
  id: string;
  content: string;
}
