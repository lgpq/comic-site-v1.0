"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { marked } from 'marked';
import type { DiaryEntry } from '@/types';
import { Pagination } from './Pagination';

type Props = {
  allDiaryEntries: DiaryEntry[];
  currentPage: number;
  itemsPerPage: number;
};

export function DiaryList({ allDiaryEntries, currentPage, itemsPerPage }: Props) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedDiaries = useMemo(() => {
    return [...allDiaryEntries].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
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
  );
}