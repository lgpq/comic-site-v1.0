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

  const handleSeriesToggle = (slug: string) => {
    setSelectedSeries(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const filteredSeries = useMemo(() => {
    if (selectedSeries.length === 0) {
      return allSeries;
    }
    return allSeries.filter(series => selectedSeries.includes(series.slug));
  }, [allSeries, selectedSeries]);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSeries.map((series) => (
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