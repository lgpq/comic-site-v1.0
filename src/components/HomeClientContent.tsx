"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';
import { ComicEpisode, ComicSeries, UpdateHistoryItem } from '@/types';

type Props = {
  allSeries: ComicSeries[];
  latestEpisodes: ComicEpisode[];
  allUpdates: UpdateHistoryItem[];
};

export default function HomeClientContent({ allSeries, latestEpisodes, allUpdates }: Props) {
  const comicsScroll = useDraggableScroll<HTMLDivElement>();
  const seriesScroll = useDraggableScroll<HTMLDivElement>();
  const router = useRouter();

  const seriesTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    allSeries.forEach(series => {
      map.set(series.slug, series.title);
    });
    return map;
  }, [allSeries]);

    const typeLabel = (type: UpdateHistoryItem['type']) => {
    switch (type) {
      case 'comic':
        return '[漫画]';
      case 'illustration':
        return '[イラスト]';
      case 'diary':
        return '[日記]';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-12">
      {/* 作品シリーズ一覧 */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">作品シリーズ</h2>
          <Link href="/comics" className="text-sm text-sky-500 hover:underline">
            もっと見る
          </Link>
        </div>
        <div
          ref={seriesScroll.ref}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={seriesScroll.handleMouseDown}
          onMouseLeave={seriesScroll.handleMouseLeaveOrUp}
          onMouseUp={seriesScroll.handleMouseLeaveOrUp}
          onMouseMove={seriesScroll.handleMouseMove}
        >
          {allSeries.map((series) => (
            <Link
              key={series.slug}
              href={`/comics/${series.slug}`}
              className="relative border rounded-lg overflow-hidden group flex-shrink-0 w-48"
              onClick={seriesScroll.preventClick}
              draggable={false}
            >
              <div className="w-full aspect-[2/3] bg-gray-200 dark:bg-gray-700">
                {series.thumbnailUrl && series.thumbnailUrl.startsWith('http') ? (
                  <Image
                    src={series.thumbnailUrl}
                    alt={series.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                <h3 className="font-semibold text-white truncate">{series.title}</h3>
                <p className="text-xs text-gray-200 truncate h-8">{series.description}</p>
                {series.firstEpisodeSlug && (
                  <div className="mt-2 text-right">
                     <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/comics/${series.slug}/${series.firstEpisodeSlug}`);
                        }}
                        className="text-xs bg-sky-500 text-white px-2 py-1 rounded hover:bg-sky-600 transition-colors"
                      >
                        最初から読む
                      </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新の漫画セクション */}
      <section className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">最新の漫画</h2>
          <Link href="/comics" className="text-sm text-sky-500 hover:underline">
            もっと見る
          </Link>
        </div>
        <div
          ref={comicsScroll.ref}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={comicsScroll.handleMouseDown}
          onMouseLeave={comicsScroll.handleMouseLeaveOrUp}
          onMouseUp={comicsScroll.handleMouseLeaveOrUp}
          onMouseMove={comicsScroll.handleMouseMove}
        >
          {latestEpisodes.map((episode) => (
            <Link
              key={`${episode.seriesTitle}-${episode.episodeSlug}`}
              href={`/comics/${episode.seriesTitle}/${episode.episodeSlug}`}
              className="relative border rounded-lg overflow-hidden group flex-shrink-0 w-48"
              onClick={comicsScroll.preventClick}
              draggable={false}
            >
              <div className="w-full aspect-[2/3] bg-gray-200 dark:bg-gray-700">
                {episode.thumbnailUrl && episode.thumbnailUrl.startsWith('http') ? (
                  <Image
                    src={episode.thumbnailUrl}
                    alt={episode.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white">
                <h3 className="font-semibold truncate">{episode.title}</h3>
                <p className="text-sm text-gray-200">
                  {seriesTitleMap.get(episode.seriesTitle) || episode.seriesTitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 更新履歴 */}
      <section className="pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">更新履歴</h2>
        </div>
        <div className="text-sm border-t">
          {allUpdates.map((update, index) => (
            <div key={index} className="flex flex-nowrap items-baseline gap-x-3 border-b p-2">
              <span className="flex-shrink-0 text-gray-500 dark:text-gray-400">
                {new Date(update.date).toLocaleDateString('ja-JP')}
              </span>
              <span className="flex-shrink-0 font-semibold">{typeLabel(update.type)}</span>
              <Link href={update.url} className="min-w-0 truncate hover:text-sky-500 hover:underline">
                {update.title}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
