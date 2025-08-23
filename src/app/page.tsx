import { getComicSeries, getAllComicEpisodes, getAllIllustrations, getAllDiaryEntries } from '@/utils/content';
import HomeClientContent from '@/components/HomeClientContent';

export default async function Home() {
  const allSeries = getComicSeries();
  const latestEpisodes = getAllComicEpisodes().slice(0, 7);
  const latestIllustrations = getAllIllustrations().slice(0, 7);
  const latestDiaryEntries = getAllDiaryEntries().slice(0, 3); // 最新3件の日記

  return (
    <HomeClientContent
      allSeries={allSeries}
      latestEpisodes={latestEpisodes}
      latestIllustrations={latestIllustrations}
      latestDiaryEntries={latestDiaryEntries}
    />
  );
}
