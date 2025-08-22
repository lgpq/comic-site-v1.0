import Link from 'next/link';
import { getAllComicEpisodes } from '@/utils/content';

export default function Home() {
  const latestEpisodes = getAllComicEpisodes().slice(0, 3);

  return (
    <div>
      <section>
        <h2 className="text-2xl font-bold mb-4">最新の漫画</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latestEpisodes.map((episode) => (
            <Link
              key={`${episode.seriesTitle}-${episode.episodeSlug}`}
              href={`/comics/${episode.seriesTitle}/${episode.episodeSlug}`}
              className="block p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <h3 className="text-lg font-semibold">{episode.title}</h3>
              <p className="text-sm text-gray-500">{episode.seriesTitle}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(episode.date).toLocaleDateString('ja-JP')}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
