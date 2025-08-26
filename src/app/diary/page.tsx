import { getAllDiaryEntries, getAllDiaryDates } from '@/utils/content';
import { DiaryPageLayout } from '@/components/DiaryPageLayout';

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