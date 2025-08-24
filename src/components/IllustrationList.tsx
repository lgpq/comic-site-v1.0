"use client";

import { useState, useMemo } from 'react';
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

  const handleClose = () => setSelectedIndex(null);

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

  const currentIllustration =
    selectedIndex !== null ? sortedIllustrations[selectedIndex] : null;

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
          {sortedIllustrations.map((illust, index) => (
            <button
              key={illust.url}
              onClick={() => setSelectedIndex(index)}
              className="border rounded-lg overflow-hidden group text-left"
            >
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
            </button>
          ))}
        </div>
      ) : (
        <p>イラストがまだありません。</p>
      )}

      {currentIllustration && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Image and Navigation */}
          <div className="relative w-full flex-grow flex items-center justify-center">
            {/* Prev Button */}
            {selectedIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white text-4xl opacity-50 hover:opacity-100 transition-opacity"
                aria-label="前の画像へ"
              >
                &#x276E;
              </button>
            )}

            <div className="relative w-full h-full max-w-5xl">
              <Image
                src={currentIllustration.url}
                alt={currentIllustration.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            {selectedIndex < sortedIllustrations.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white text-4xl opacity-50 hover:opacity-100 transition-opacity"
                aria-label="次の画像へ"
              >
                &#x276F;
              </button>
            )}
          </div>

          {/* Info Panel */}
          <div className="w-full max-w-5xl text-white mt-2 p-4 bg-black/30 rounded-lg text-center flex-shrink-0">
            <h3 className="text-xl font-bold">{currentIllustration.title}</h3>
            <p className="text-sm text-gray-300">{new Date(currentIllustration.date).toLocaleDateString('ja-JP')}</p>
            {currentIllustration.comment && (
              <p className="mt-2 text-gray-200 text-base">{currentIllustration.comment}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}