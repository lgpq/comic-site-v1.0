import Link from 'next/link';
import { getAllComicEpisodes, getComicSeries } from '@/utils/content';

type Props = {
  seriesSlug: string;
  episodeSlug: string;
};

export function EpisodeNavigation({ seriesSlug, episodeSlug }: Props) {
  // シリーズ情報を取得
  const series = getComicSeries().find((s) => s.slug === seriesSlug);
  const seriesTitle = series ? series.title : seriesSlug;

  // シリーズ内の全エピソードを取得し、日付順（古い順 = 話数順）にソート
  const allEpisodesInSeries = getAllComicEpisodes()
    .filter((ep) => ep.seriesTitle === seriesSlug)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const currentEpisodeIndex = allEpisodesInSeries.findIndex(
    (ep) => ep.episodeSlug === episodeSlug
  );

  // データ不整合の場合は何も表示しない
  if (currentEpisodeIndex === -1) {
    return null;
  }

  const prevEpisode = allEpisodesInSeries[currentEpisodeIndex - 1];
  const nextEpisode = allEpisodesInSeries[currentEpisodeIndex + 1];

  return (
    <nav className="flex justify-between items-center w-full max-w-2xl my-4 p-2 border-y">
      <div>
        {prevEpisode && (
          <Link href={`/comics/${seriesSlug}/${prevEpisode.episodeSlug}`} className="text-sky-500 hover:underline">
            &larr; {prevEpisode.title}
          </Link>
        )}
      </div>
      <Link href={`/comics/${seriesSlug}`} className="text-gray-600 dark:text-gray-300 hover:underline">
        {seriesTitle}
      </Link>
      <div>
        {nextEpisode && (
          <Link href={`/comics/${seriesSlug}/${nextEpisode.episodeSlug}`} className="text-sky-500 hover:underline">
            {nextEpisode.title} &rarr;
          </Link>
        )}
      </div>
    </nav>
  );
}