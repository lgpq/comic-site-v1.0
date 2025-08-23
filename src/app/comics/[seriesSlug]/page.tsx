import Link from 'next/link';
import { getAllComicEpisodes, getComicSeries } from '@/utils/content';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    seriesSlug: string;
  };
};

export default function ComicSeriesPage({ params }: Props) {
  const { seriesSlug } = params;
  const series = getComicSeries().find((s) => s.slug === seriesSlug);
  const episodes = getAllComicEpisodes().filter((ep) => ep.seriesTitle === seriesSlug);

  if (!series) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{series.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{series.description}</p>
      <ul className="space-y-4">
        {episodes.map((episode) => (
          <li key={episode.episodeSlug}>
            <Link href={`/comics/${series.slug}/${episode.episodeSlug}`} className="block p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <h3 className="text-xl font-semibold">{episode.title}</h3>
              <p className="text-sm text-gray-500">{new Date(episode.date).toLocaleDateString('ja-JP')}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
