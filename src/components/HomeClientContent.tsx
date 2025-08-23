"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ComicEpisode, Illustration, DiaryEntry } from '@/utils/content';

type Props = {
  latestEpisodes: ComicEpisode[];
  latestIllustrations: Illustration[];
  latestDiaryEntries: DiaryEntry[];
};

export default function HomeClientContent({ latestEpisodes, latestIllustrations, latestDiaryEntries }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
    scrollContainerRef.current.style.userSelect = 'none';
  };

  const handleMouseLeaveOrUp = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
    scrollContainerRef.current.style.userSelect = 'auto';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // ドラッグ感度を調整
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

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

      {/* 最新の漫画セクション */}
      <section className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">最新の漫画</h2>
          <Link href="/comics" className="text-sm text-sky-500 hover:underline">
            もっと見る
          </Link>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
        >
          {latestEpisodes.map((episode) => (
            <Link
              key={`${episode.seriesTitle}-${episode.episodeSlug}`}
              href={`/comics/${episode.seriesTitle}/${episode.episodeSlug}`}
              className="border rounded-lg overflow-hidden group flex-shrink-0 w-48"
              onClick={(e) => {
                if (isDragging) e.preventDefault();
              }}
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {latestIllustrations.map((illust) => (
            <Link
              key={illust.url}
              href="/illustrations" // 詳細ページがないため一覧へ
              className="border rounded-lg overflow-hidden group"
            >
              <div className="w-full aspect-square relative bg-gray-200 dark:bg-gray-700">
                <Image
                  src={illust.url}
                  alt={illust.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新の日記セクション */}
      <section className='PB-8'>
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
