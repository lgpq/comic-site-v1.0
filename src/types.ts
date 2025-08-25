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
  url: string;
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
};

export type DiaryEntry = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  content: string;
};