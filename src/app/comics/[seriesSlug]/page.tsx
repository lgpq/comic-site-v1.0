import { getAllComicEpisodes, getComicSeries } from '@/utils/content';
import { notFound } from 'next/navigation';
import { EpisodeList } from '@/components/EpisodeList';
import type { Metadata } from 'next';

type PageProps = {
  params: {
    seriesSlug: string;
  };
};

export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<PageProps['params']>;
}): Promise<Metadata> {
  const { seriesSlug } = await paramsPromise;
  const series = getComicSeries().find((s) => s.slug === seriesSlug);

  if (!series) {
    return {
      title: 'シリーズが見つかりません',
    };
  }

  return {
    title: series.title,
    description: series.description || `「${series.title}」のページです。`,
    openGraph: {
      title: series.title,
      description: series.description || `「${series.title}」のページです。`,
      images: series.thumbnailUrl ? [series.thumbnailUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  const allSeries = getComicSeries();
  return allSeries.map((series) => ({
    seriesSlug: series.slug,
  }));
}

export default async function ComicSeriesPage({
  params: paramsPromise,
}: {
  params: Promise<PageProps['params']>;
}) {
  const { seriesSlug } = await paramsPromise;
  const series = getComicSeries().find((s) => s.slug === seriesSlug);
  const episodes = getAllComicEpisodes().filter((ep) => ep.seriesTitle === seriesSlug);

  if (!series) {
    notFound();
  }

  return <EpisodeList series={series} episodes={episodes} />;
}