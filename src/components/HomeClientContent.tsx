"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ComicEpisode, DiaryEntry, Illustration, ComicSeries } from '@/types';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';

type Props = {
  allSeries: ComicSeries[];
  latestEpisodes: ComicEpisode[];
  latestIllustrations: Illustration[];
  latestDiaryEntries: DiaryEntry[];
};

export default function HomeClientContent({ allSeries, latestEpisodes, latestIllustrations, latestDiaryEntries }: Props) {
  const comicsScroll = useDraggableScroll<HTMLDivElement>();
  const illustsScroll = useDraggableScroll<HTMLDivElement>();
  const seriesScroll = useDraggableScroll<HTMLDivElement>();

  return (
    <div className="space-y-12">
      {/* ヒーローセクション (プレースホルダー) */}
      <section className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h1 className="text-4xl font-bold">あなたの作品タイトル</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          サイトのキャッチコピーや説明文をここに記載します。
        </p>
        <Link
          href="/comics"
          className="mt-4 inline-block bg-sky-500 text-white font-bold py-2 px-4 rounded hover:bg-sky-600 transition-colors"
        >
          作品一覧へ
        </Link>
      </section>

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
              className="border rounded-lg overflow-hidden group flex-shrink-0 w-48"
              onClick={seriesScroll.preventClick}
              draggable={false}
            >
              <div className="w-full aspect-[2/3] relative bg-gray-200 dark:bg-gray-700">
                {series.thumbnailUrl && series.thumbnailUrl.startsWith('http') ? (
                  <Image
                    src={series.thumbnailUrl}
                    alt={series.title}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold truncate">{series.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{series.description}</p>
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
              className="border rounded-lg overflow-hidden group flex-shrink-0 w-48"
              onClick={comicsScroll.preventClick}
              draggable={false}
            >
              <div className="w-full aspect-[2/3] relative bg-gray-200 dark:bg-gray-700">
                {episode.thumbnailUrl && episode.thumbnailUrl.startsWith('http') ? (
                  <Image
                    src={episode.thumbnailUrl}
                    alt={episode.title}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Image</div>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold truncate">{episode.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{episode.seriesTitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新のイラストセクション */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">最新のイラスト</h2>
          <Link href="/illustrations" className="text-sm text-sky-500 hover:underline">
            もっと見る
          </Link>
        </div>
        <div
          ref={illustsScroll.ref}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={illustsScroll.handleMouseDown}
          onMouseLeave={illustsScroll.handleMouseLeaveOrUp}
          onMouseUp={illustsScroll.handleMouseLeaveOrUp}
          onMouseMove={illustsScroll.handleMouseMove}
        >
          {latestIllustrations.map((illust) => (
            <Link
              key={illust.url}
              href="/illustrations" // 詳細ページがないため一覧へ
              className="border rounded-lg overflow-hidden group flex-shrink-0 w-48"
              onClick={illustsScroll.preventClick}
              draggable={false}
            >
              <div className="w-full aspect-square relative bg-gray-200 dark:bg-gray-700">
                <Image
                  src={illust.url}
                  alt={illust.title}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  draggable={false}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新の日記セクション */}
      <section className="pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">最新の日記</h2>
          <Link href="/diary" className="text-sm text-sky-500 hover:underline">
            もっと見る
          </Link>
        </div>
        <div className="space-y-4">
          {latestDiaryEntries.map((entry) => {
            const [year, month] = entry.slug.split('-');
            return (
              <Link
                key={entry.slug}
                href={`/diary/${year}/${month}/${entry.slug}`}
                className="block p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="font-semibold truncate">{entry.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(entry.date).toLocaleDateString('ja-JP')}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
