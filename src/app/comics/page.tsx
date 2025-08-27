import { getComicSeries } from '@/utils/content';
import { ComicsList } from '@/components/ComicsList';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '漫画一覧',
  description: '公開されている漫画シリーズの一覧です。',
};

export default function ComicsPage() {
  const allSeries = getComicSeries();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">漫画一覧</h2>
      <ComicsList allSeries={allSeries} />
    </div>
  );
}