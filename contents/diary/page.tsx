import Link from 'next/link';
import { getAllDiaryEntries } from '@/utils/content';

export default function DiaryListPage() {
  const entries = getAllDiaryEntries();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">日記一覧</h2>
      <div className="space-y-6">
        {entries.map((entry) => (
          <Link key={entry.slug} href={`/diary/${entry.slug}`} className="block group">
            <h3 className="text-xl font-semibold group-hover:text-sky-500 transition-colors">
              {entry.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(entry.date).toLocaleDateString('ja-JP')}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}