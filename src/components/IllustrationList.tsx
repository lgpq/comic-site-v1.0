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
      {sortedIllustrations.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedIllustrations.map((illust) => (
            <div key={illust.url} className="border rounded-lg overflow-hidden group">
              <div className="w-full aspect-square relative">
                <Image
                  src={illust.url}
                  alt={illust.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              </div>
              <div className="p-2">
                <h3 className="font-semibold truncate">{illust.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(illust.date).toLocaleDateString('ja-JP')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>イラストがまだありません。</p>
      )}
    </div>
  );
}