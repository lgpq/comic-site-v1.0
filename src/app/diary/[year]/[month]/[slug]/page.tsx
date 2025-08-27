import { getAllDiaryEntries, getDiaryEntryBySlug } from '@/utils/content';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import type { Metadata } from 'next';

type Props = {
  // Next.js 15では、ページのparamsはPromiseとして渡されます
  params: Promise<{
    year: string;
    month: string;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const entry = getDiaryEntryBySlug(decodedSlug);

  if (!entry) {
    return {
      title: '日記が見つかりません',
    };
  }

  // 本文から最初の120文字を抽出し、改行をスペースに置換して説明文を作成
  const description =
    entry.content.substring(0, 120).replace(/\n/g, ' ') + '...';

  return {
    title: entry.title,
    description,
    openGraph: {
      title: entry.title,
      description,
    },
  };
}

// ビルド時に静的なパスを生成します
export async function generateStaticParams() {
  const entries = getAllDiaryEntries();
  return entries.map((entry) => {
    // slugから年と月を抽出します
    const [year, month] = entry.slug.split('-');
    return {
      year,
      month,
      slug: entry.slug,
    };
  });
}

// コンポーネントを `async` に変更します
export default async function DiaryEntryPage({ params }: Props) {
  // `params` のPromiseが解決するのを待ってからslugを取り出します
  const { slug } = await params;
  // URLから渡されるslugはエンコードされているため、デコードします
  const decodedSlug = decodeURIComponent(slug);
  const entry = getDiaryEntryBySlug(decodedSlug);

  if (!entry) {
    notFound();
  }

  const contentHtml = await marked.parse(entry.content);

  return (
    <article>
      <h1 className="text-3xl font-bold mb-2">{entry.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {new Date(entry.date).toLocaleDateString('ja-JP')}
      </p>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml as string }}
      />
    </article>
  );
}
