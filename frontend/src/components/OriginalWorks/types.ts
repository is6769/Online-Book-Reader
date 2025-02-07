export interface Chapter {
  id: number;
  title: string;
  content: string;
  wordCount: number;
  status: 'draft' | 'published' | 'scheduled';
  lastModified?: string;
  scheduledFor?: string;
  isScheduled?: boolean;
}

export interface BookDetails {
  id: string;
  title: string;
  cover: string;
  description: string;
  genre: string;
  status: 'draft' | 'published';
  chapters: Chapter[];
  stats: {
    views: number;
    likes: number;
    comments: number;
    rating?: number;
  };
  metadata?: {
    language: string;
    targetAudience: string;
    themes: string[];
    contentWarnings: string[];
    copyright: string;
    status: string;
  };
  settings?: {
    enableComments: boolean;
    visibility: string;
    allowReader: boolean;
    monetization: string;
  };
}
