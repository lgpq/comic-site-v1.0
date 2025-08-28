import { getAllDiaryEntries, getAllDiaryDates } from '@/utils/content';
import { DiaryPageLayout } from '@/components/DiaryPageLayout';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '日記',
  description: '日々の出来事や制作の進捗などを記録しています。',
};

const DIARIES_PER_PAGE = 5;

export default async function DiaryTopPage() {
  const allDiaryEntries = getAllDiaryEntries();
  const allDiaryDates = getAllDiaryDates();

  return (
    <DiaryPageLayout
      allDiaryEntries={allDiaryEntries}
      allDiaryDates={allDiaryDates}
      currentPage={1}
      itemsPerPage={DIARIES_PER_PAGE}
    />
  );
}