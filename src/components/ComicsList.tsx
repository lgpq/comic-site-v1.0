"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ComicSeries } from '@/types';

type Props = {
  allSeries: ComicSeries[];
};

export function ComicsList({ allSeries }: Props) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedSeries = useMemo(() => {
    return [...allSeries].sort((a, b) => {
      const dateA = new Date(a.lastUpdated || 0).getTime();
      const dateB = new Date(b.lastUpdated || 0).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [allSeries, sortOrder]);

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <span>並び順:</span>
          <button
            onClick={() => setSortOrder('newest')}
            className={`px-2 py-1 rounded transition-colors ${sortOrder === 'newest' ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
            更新が新しい順
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`px-2 py-1 rounded transition-colors ${sortOrder === 'oldest' ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
          >
            更新が古い順
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedSeries.map((series) => (
          <Link key={series.slug} href={`/comics/${series.slug}`} className="relative border rounded-lg overflow-hidden group">
            <div className="w-full aspect-[2/3] bg-gray-200 dark:bg-gray-700">
              {series.thumbnailUrl && series.thumbnailUrl.startsWith('http') ? (
                <Image
                  src={series.thumbnailUrl}
                  alt={series.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 flex h-1/3 flex-col justify-end p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="font-semibold truncate">{series.title}</h3>
              <p className="text-sm text-gray-200 truncate h-8">{series.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}