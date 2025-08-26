"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import { DiaryCalendar } from '@/components/DiaryCalendar';
import { Pagination } from '@/components/Pagination';
import type { DiaryEntry } from '@/types';

type Props = {
  allDiaryEntries: DiaryEntry[];
  allDiaryDates: string[];
  currentPage: number;
  itemsPerPage: number;
};

export function DiaryPageLayout({ allDiaryEntries, allDiaryDates, currentPage, itemsPerPage }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedDiaries = useMemo(() => {
    return [...allDiaryEntries].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (isNaN(dateA) || isNaN(dateB)) return 0;
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [allDiaryEntries, sortOrder]);

  const paginatedDiaries = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedDiaries.slice(startIndex, endIndex);
  }, [sortedDiaries, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(allDiaryEntries.length / itemsPerPage);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">日記</h1>
        {/* Calendar Toggle Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
            aria-label="カレンダーを開く"
          >
            カレンダー
          </button>
        </div>
      </div>

      {/* Mobile Calendar (Modal/Drawer) */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity ${isCalendarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCalendarOpen(false)}
        aria-hidden={!isCalendarOpen}
      />
      <div 
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-lg p-4 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isCalendarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <DiaryCalendar 
          highlightDates={allDiaryDates} 
          diaryEntries={allDiaryEntries} 
          onDateClick={() => setIsCalendarOpen(false)}
        />
      </div>

      <div className="flex flex-col md:flex-row-reverse gap-12">
        <aside className="hidden md:block md:w-1/3 lg:w-1/4">
          <DiaryCalendar highlightDates={allDiaryDates} diaryEntries={allDiaryEntries} />
        </aside>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center space-x-2 text-sm">
              <span>並び順:</span>
              <button
                onClick={() => setSortOrder('newest')}
                className={`px-2 py-1 rounded transition-colors ${sortOrder === 'newest' ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
              >
                新しい順
              </button>
              <button
                onClick={() => setSortOrder('oldest')}
                className={`px-2 py-1 rounded transition-colors ${sortOrder === 'oldest' ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
              >
                古い順
              </button>
            </div>
          </div>

          <div className="space-y-16">
            {paginatedDiaries.map((entry) => {
              const [year, month] = entry.date.split('-');
              const detailUrl = `/diary/${year}/${month}/${entry.slug}`;
              return (
                <article key={entry.slug} className="prose dark:prose-invert max-w-none border-b pb-8">
                  <Link href={detailUrl} className="no-underline hover:underline">
                    <h2 className="text-2xl font-bold !mb-2">{entry.title}</h2>
                  </Link>
                  <p className="text-sm text-gray-500 !mt-0">
                    {new Date(entry.date).toLocaleDateString('ja-JP')}
                  </p>
                  <div dangerouslySetInnerHTML={{ __html: marked.parse(entry.content) as string }} />
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={currentPage} basePath="/diary" />
          )}
        </div>
      </div>
    </div>
  );
}