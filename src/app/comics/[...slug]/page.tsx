import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type Props = {
  // In Next.js 15, page params are passed as a Promise.
  // We need to use an async component to await them.
  params: Promise<{
    slug: string[]
  }>;
};

interface EpisodeData {
  title: string;
  date: string | Date;
  tags: string[];
  pages: string[];
}

const getEpisodeData = (slug: string[]): EpisodeData | null => {
  const filePath = path.join(process.cwd(), 'contents', 'comics', ...slug, 'meta.yaml');

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = yaml.load(fileContent);
  return data as EpisodeData;
}

export default async function ComicEpisodePage({ params }: Props) {
  // Await the params Promise to get the actual slug object
  const { slug } = await params;
  const episodeData = getEpisodeData(slug);

  if (!episodeData || !Array.isArray(episodeData.pages)) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">{episodeData.title}</h1>
      <p className="text-gray-500 mb-8">公開日: {new Date(episodeData.date).toLocaleDateString('ja-JP')}</p>
      <div className="w-full max-w-2xl">
        {episodeData.pages.map((pageUrl: string, index: number) => (
          <Image key={index} src={pageUrl} alt={`${episodeData.title} - ページ${index + 1}`} width={800} height={1200} className="mx-auto mb-4" />
        ))}
      </div>
    </div>
  );
}