export type ComicSeries = {
  slug: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  lastUpdated?: string; // YYYY-MM-DD
  firstEpisodeSlug?: string;
};

export type ComicEpisode = {
  seriesTitle: string;
  episodeSlug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  pages: string[];
  thumbnailUrl?: string;
};

export type Illustration = {
  title: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  url: string;
  comment?: string;
};

export type DiaryEntry = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  content: string;
};

export type Update = {
  type: 'comic' | 'illustration' | 'diary';
  title: string;
  date: string;
  url: string;
};

export type EpisodeData = Omit<ComicEpisode, 'seriesTitle' | 'episodeSlug' | 'thumbnailUrl'>;