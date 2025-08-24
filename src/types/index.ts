export type ComicEpisode = {
  seriesTitle: string;
  episodeSlug: string;
  title: string;
  date: string;
  thumbnailUrl?: string;
};

export type Illustration = {
  title: string;
  date: string;
  tags: string[];
  url: string;
  comment?: string;
};

export type DiaryEntry = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
};

export type ComicSeries = {
  slug: string;
  title: string;
  author: string;
  description: string;
  thumbnailUrl?: string;
  firstEpisodeSlug?: string;
  lastUpdated: string;
};

export type EpisodeData = {
  title: string;
  date: string | Date;
  tags: string[];
  pages: string[];
};

export type UpdateHistoryItem = {
  type: 'comic' | 'illustration' | 'diary';
  title: string;
  date: string;
  url: string;
};