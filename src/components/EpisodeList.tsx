"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ComicEpisode, ComicSeries } from '@/types';

type Props = {
  series: ComicSeries;
  episodes: ComicEpisode[];
};

export function EpisodeList({ series, episodes }: Props) {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedEpisodes = useMemo(() => {
    return [...episodes].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [episodes, sortOrder]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{series.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{series.description}</p>

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sortedEpisodes.map((episode) => (
          <Link key={episode.episodeSlug} href={`/comics/${series.slug}/${episode.episodeSlug}`} className="relative border rounded-lg overflow-hidden group">
            <div className="w-full aspect-[2/3] bg-gray-200 dark:bg-gray-700">
              {episode.thumbnailUrl && episode.thumbnailUrl.startsWith('http') ? (
                <Image
                  src={episode.thumbnailUrl}
                  alt={episode.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white">
              <h3 className="font-semibold truncate">{episode.title}</h3>
              <p className="text-sm text-gray-200">{new Date(episode.date).toLocaleDateString('ja-JP')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}