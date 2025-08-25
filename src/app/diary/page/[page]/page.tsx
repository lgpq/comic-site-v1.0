import { getAllDiaryEntries } from '@/utils/content';
import { DiaryList } from '@/components/DiaryList';
import { notFound } from 'next/navigation';

const DIARIES_PER_PAGE = 5;

export default async function DiaryPaginatedPage({ params }: { params: { page: string } }) {
  const allDiaryEntries = getAllDiaryEntries();
  
  const currentPage = parseInt(params.page, 10);
  const totalPages = Math.ceil(allDiaryEntries.length / DIARIES_PER_PAGE);

  if (isNaN(currentPage) || currentPage < 2 || currentPage > totalPages) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">日記</h1>
      <DiaryList
        allDiaryEntries={allDiaryEntries}
        currentPage={currentPage}
        itemsPerPage={DIARIES_PER_PAGE}
      />
    </div>
  );
}