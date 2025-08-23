import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { EpisodeNavigation } from '@/components/EpisodeNavigation';
import { EpisodeData } from '@/types';

type Props = {
  params: Promise<{
    seriesSlug: string;
    episodeSlug: string;
  }>;
};

const getEpisodeData = (seriesSlug: string, episodeSlug: string): EpisodeData | null => {
  const filePath = path.join(process.cwd(), 'contents', 'comics', seriesSlug, episodeSlug, 'meta.yaml');

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  try {
    const data = yaml.load(fileContent);
    return data as EpisodeData;
  } catch (e) {
    return null;
  }
}

export default async function ComicEpisodePage({ params }: Props) {
  // Await the params Promise to get the actual slug object
  const { seriesSlug, episodeSlug } = await params;
  const episodeData = getEpisodeData(seriesSlug, episodeSlug);

  if (!episodeData || !Array.isArray(episodeData.pages)) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <EpisodeNavigation seriesSlug={seriesSlug} episodeSlug={episodeSlug} />
      <h1 className="text-3xl font-bold mb-4">{episodeData.title}</h1>
      <p className="text-gray-500 mb-8">公開日: {new Date(episodeData.date).toLocaleDateString('ja-JP')}</p>
      <div className="w-full max-w-2xl">
        {episodeData.pages.map((pageUrl: string, index: number) => (
          <Image key={index} src={pageUrl} alt={`${episodeData.title} - ページ${index + 1}`} width={800} height={1200} className="mx-auto mb-4" />
        ))}
      </div>
      <EpisodeNavigation seriesSlug={seriesSlug} episodeSlug={episodeSlug} />
    </div>
  );
}