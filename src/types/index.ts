export interface Genre {
  id: string;
  name: string;
  description: string;
  themes: string[];
  icon: string;
  color: string;
  mood: string[];
}

export interface Story {
  id: string;
  title: string;
  content: string;
  genre: string;
  characters: Character[];
  educationalElements: string[];
  estimatedReadTime: number;
  createdAt: Date;
  originalContent: string;
}

export interface Character {
  name: string;
  role: string;
  represents: string;
  description: string;
}

export interface Track {
  title: string;
  artist: string;
  duration: string;
  mood: string;
  genre: string;
}

export interface Playlist {
  name: string;
  description: string;
  tracks: Track[];
  totalDuration: string;
}

export interface ContentUpload {
  content: string;
  filename: string;
  wordCount: number;
  type: 'text' | 'file';
}