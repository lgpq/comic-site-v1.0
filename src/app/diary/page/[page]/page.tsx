import { getAllDiaryEntries, getAllDiaryDates } from '@/utils/content';
import { DiaryPageLayout } from '@/components/DiaryPageLayout';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const ITEMS_PER_PAGE = 10;

type Props = {
  params: Promise<{
    page: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: pageString } = await params;
  const page = parseInt(pageString, 10);
  return {
    title: `日記 (${page}ページ目)`,
    description: `日記の一覧、${page}ページ目です。`,
  };
}

export async function generateStaticParams() {
  const allDiaryEntries = getAllDiaryEntries();
  const totalPages = Math.ceil(allDiaryEntries.length / ITEMS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function PaginatedDiaryPage({ params }: Props) {
  const { page: pageString } = await params;
  const currentPage = parseInt(pageString, 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const allDiaryEntries = getAllDiaryEntries();
  const allDiaryDates = getAllDiaryDates();

  return (
    <DiaryPageLayout
      allDiaryEntries={allDiaryEntries}
      allDiaryDates={allDiaryDates}
      currentPage={currentPage}
      itemsPerPage={ITEMS_PER_PAGE}
    />
  );
}
