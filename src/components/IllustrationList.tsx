"use client";

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Illustration } from '@/types';

type Props = {
  illustrations: Illustration[];
};

export function IllustrationList({ illustrations }: Props) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const sortedIllustrations = useMemo(() => {
    return [...illustrations].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [illustrations, sortOrder]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null && selectedIndex < sortedIllustrations.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowLeft') {
        if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
      } else if (e.key === 'ArrowRight') {
        if (selectedIndex < sortedIllustrations.length - 1) setSelectedIndex(selectedIndex + 1);
      } else if (e.key === 'Escape') {
        setSelectedIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, sortedIllustrations.length]);

  return (
    <div>
      <div className="flex justify-start items-center mb-4">
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
        {sortedIllustrations.map((illust, index) => (
          <div
            key={illust.url}
            className="relative border rounded-lg overflow-hidden group aspect-square bg-gray-200 dark:bg-gray-700 cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
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

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60]"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl z-10 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            aria-label="前の画像"
          >
            &#x25C0;
          </button>

          <div className="relative flex flex-col items-center justify-center w-11/12 max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[80vh]">
              <Image
                src={sortedIllustrations[selectedIndex].url}
                alt={sortedIllustrations[selectedIndex].title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {sortedIllustrations[selectedIndex].comment && (
              <div className="bg-gray-900 bg-opacity-70 text-white p-4 mt-2 rounded-lg w-full">
                <p className="text-sm">{sortedIllustrations[selectedIndex].comment}</p>
              </div>
            )}
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl z-10 disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
            onClick={handleNext}
            disabled={selectedIndex === sortedIllustrations.length - 1}
            aria-label="次の画像"
          >
            &#x25B6;
          </button>
        </div>
      )}
    </div>
  );
}