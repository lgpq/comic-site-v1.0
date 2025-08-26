import { getAllDiaryEntries, getAllDiaryDates } from '@/utils/content';
import { DiaryPageLayout } from '@/components/DiaryPageLayout';
import { notFound } from 'next/navigation';

const DIARIES_PER_PAGE = 5;

export default async function DiaryPaginatedPage({ params }: { params: { page: string } }) {
  const allDiaryEntries = getAllDiaryEntries();
  const allDiaryDates = getAllDiaryDates();
  
  const currentPage = parseInt(params.page, 10);
  const totalPages = Math.ceil(allDiaryEntries.length / DIARIES_PER_PAGE);

  if (isNaN(currentPage) || currentPage < 2 || currentPage > totalPages) {
    notFound();
  }

  return (
    <DiaryPageLayout
      allDiaryEntries={allDiaryEntries}
      allDiaryDates={allDiaryDates}
      currentPage={currentPage}
      itemsPerPage={DIARIES_PER_PAGE}
    />
  );
}