import Link from 'next/link';
import { getAllComicEpisodes } from '@/utils/content';

export default function ComicsPage() {
  const episodes = getAllComicEpisodes();
  return (
    <div>
      <h2 className="text-2xl font-bold">漫画一覧</h2>
      <ul className="mt-8 space-y-4">
        {episodes.map((episode) => (
          <li key={`${episode.seriesTitle}-${episode.episodeSlug}`}>
            <Link
              href={`/comics/${episode.seriesTitle}/${episode.episodeSlug}`}
              className="block p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <h3 className="text-xl font-semibold">
                {episode.seriesTitle} - {episode.title}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(episode.date).toLocaleDateString('ja-JP')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}