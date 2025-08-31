export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  title: string;
  company: string;
  tagline: string;
  about: string;
}

export interface CareerEntry {
  id: string;
  company: string;
  logo: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  cgpa?: string;
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  repo_url?: string;
  demo_url?: string;
  how_to_use?: string;
  achievements?: string[];
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export interface GraphNode {
  id: string;
  title: string;
  summary: string;
  description: string;
  color: string;
  size: 'small' | 'medium' | 'large';
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

export interface SiteStructure {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface OngoingTask {
  id: string;
  title: string;
  summary: string;
  status: 'backlog' | 'in-progress' | 'review' | 'done';
  progress: number;
  color: string;
  timeline?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  tags: string[];
  readTime: number;
}

export interface Puzzle {
  id: string;
  title: string;
  question: string;
  answer?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  hints?: string[];
  isPublic: boolean;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  score: number;
  section: string;
}

export interface EmbeddingChunk {
  chunk_id: string;
  title: string;
  url: string;
  text: string;
  embedding?: number[];
  metadata: {
    section: string;
    tags: string[];
  };
}
