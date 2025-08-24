"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ComicSeries } from '@/types';

type Props = {
  allSeries: ComicSeries[];
};

export function ComicsList({ allSeries }: Props) {
  const [selectedSeries, setSelectedSeries] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const handleSeriesToggle = (slug: string) => {
    setSelectedSeries(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const filteredAndSortedSeries = useMemo(() => {
    let series = allSeries;
    if (selectedSeries.length > 0) {
      series = allSeries.filter(s => selectedSeries.includes(s.slug));
    }

    return [...series].sort((a, b) => {
      const dateA = new Date(a.lastUpdated).getTime();
      const dateB = new Date(b.lastUpdated).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  }, [allSeries, selectedSeries, sortOrder]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <h3 className="text-lg font-semibold mb-4">シリーズで絞り込む</h3>
        <div className="space-y-2">
          {allSeries.map(series => (
            <label key={series.slug} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSeries.includes(series.slug)}
                onChange={() => handleSeriesToggle(series.slug)}
                className="form-checkbox h-5 w-5 text-sky-600 rounded"
              />
              <span>{series.title}</span>
            </label>
          ))}
        </div>
      </aside>
      <main className="flex-1">
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
          {filteredAndSortedSeries.map((series) => (
            <Link key={series.slug} href={`/comics/${series.slug}`} className="border rounded-lg overflow-hidden group">
              <div className="w-full aspect-[2/3] relative bg-gray-200 dark:bg-gray-700">
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
              <div className="p-3">
                <h3 className="font-semibold truncate group-hover:text-sky-500 transition-colors">{series.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{series.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}