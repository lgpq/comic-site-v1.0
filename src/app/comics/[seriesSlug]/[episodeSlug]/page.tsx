import { getAllComicEpisodes } from '@/utils/content';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { EpisodeNavigation } from '@/components/EpisodeNavigation';

type Props = {
  params: Promise<{
    seriesSlug: string;
    episodeSlug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seriesSlug, episodeSlug } = await params;
  const episode = getAllComicEpisodes().find(
    (ep) => ep.seriesTitle === seriesSlug && ep.episodeSlug === episodeSlug
  );

  if (!episode) {
    return {
      title: 'エピソードが見つかりません',
    };
  }

  const title = `${episode.title} - ${episode.seriesTitle}`;
  const description = `「${episode.seriesTitle}」の${episode.title}です。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: episode.thumbnailUrl ? [episode.thumbnailUrl] : [],
    },
  };
}

export default async function ComicEpisodePage({ params }: Props) {
  // Await the params Promise to get the actual slug object
  const { seriesSlug, episodeSlug } = await params;
  const episodeData = getAllComicEpisodes().find(
    (ep) => ep.seriesTitle === seriesSlug && ep.episodeSlug === episodeSlug
  );

  if (!episodeData || !Array.isArray(episodeData.pages)) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <EpisodeNavigation seriesSlug={seriesSlug} episodeSlug={episodeSlug} />
      <h1 className="text-3xl font-bold mb-4">{episodeData.title}</h1>
      <p className="text-gray-500 mb-8">
        公開日: {new Date(episodeData.date).toLocaleDateString('ja-JP')}
      </p>
      <div className="w-full max-w-2xl">
        {episodeData.pages.map((pageUrl: string, index: number) => (
          <Image key={index} src={pageUrl} alt={`${episodeData.title} - ページ${index + 1}`} width={800} height={1200} className="mx-auto mb-4" />
        ))}
      </div>
      <EpisodeNavigation seriesSlug={seriesSlug} episodeSlug={episodeSlug} />
    </div>
  );
}