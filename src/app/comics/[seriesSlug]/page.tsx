import { getAllComicEpisodes, getComicSeries } from '@/utils/content';
import { notFound } from 'next/navigation';
import { EpisodeList } from '@/components/EpisodeList';

type Props = {
  params: {
    // In Next.js 15, page params are passed as a Promise.
    seriesSlug: string
  };
};

export default async function ComicSeriesPage({ params }: Props) {
  // Await the params Promise to get the actual slug
  const { seriesSlug } = await params;
  const series = getComicSeries().find((s) => s.slug === seriesSlug);
  const episodes = getAllComicEpisodes().filter((ep) => ep.seriesTitle === seriesSlug);

  if (!series) {
    notFound();
  }

  return <EpisodeList series={series} episodes={episodes} />;
}