"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Illustration } from '@/types';

type Props = {
  illustrations: Illustration[];
};

export function IllustrationList({ illustrations }: Props) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedIllustrations = useMemo(() => {
    return [...illustrations].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [illustrations, sortOrder]);

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sortedIllustrations.map((illust) => (
          <div key={illust.url} className="relative border rounded-lg overflow-hidden group aspect-square bg-gray-200 dark:bg-gray-700">
            <Image
              src={illust.url}
              alt={illust.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
            <div className="absolute inset-x-0 bottom-0 flex h-1/3 flex-col justify-end p-3 bg-gradient-to-t from-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="font-semibold truncate">{illust.title}</h3>
              <p className="text-sm text-gray-200">{new Date(illust.date).toLocaleDateString('ja-JP')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}