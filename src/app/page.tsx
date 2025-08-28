import { getComicSeries, getAllComicEpisodes, getAllUpdates } from '@/utils/content';
import HomeClientContent from '@/components/HomeClientContent';

export default async function Home() {
  const allSeries = getComicSeries();
  const latestEpisodes = getAllComicEpisodes().slice(0, 7);
  const allUpdates = getAllUpdates().slice(0, 10); // 最新10件の更新履歴

  return (
    <HomeClientContent
      allSeries={allSeries}
      latestEpisodes={latestEpisodes}
      allUpdates={allUpdates}
    />
  );
}
