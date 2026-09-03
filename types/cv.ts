export interface Experience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface Candidate {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  git_repo?: string;
}

export interface CvAnalysis {
  candidate: Candidate;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: string[];
  certifications: string[];
  ats_score: number;
  ats_friendly: boolean;
  keywords_found: string[];
  missing_keywords: string[];
  issues: string[];
  recommendations: string[];
}

export interface AnalyzeCvResponse {
  success: boolean;
  data: CvAnalysis;
  message?: string;
}
