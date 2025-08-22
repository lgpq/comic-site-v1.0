import { getAllDiaryEntries, getDiaryEntryBySlug } from '@/utils/content';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

type Props = {
  // Next.js 15では、ページのparamsはPromiseとして渡されます。
  // これを解決するためにasyncコンポーネントを使用します。
  params: Promise<{
    slug: string;
  }>;
};

// この関数は、ビルド時に静的なページを生成するためにNext.jsが使用します
export async function generateStaticParams() {
  const entries = getAllDiaryEntries();
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

// コンポーネントを `async` に変更します
export default async function DiaryEntryPage({ params }: Props) {
  // `params` のPromiseが解決するのを待ってからslugを取り出します
  const { slug } = await params;
  const entry = getDiaryEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const contentHtml = marked.parse(entry.content);

  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {new Date(entry.date).toLocaleDateString('ja-JP')}
      </p>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
