import Image from 'next/image';
import { getAllIllustrations } from '@/utils/content';

export default function IllustrationsPage() {
  const illustrations = getAllIllustrations();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">イラスト一覧</h2>
      {illustrations.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {illustrations.map((illust) => (
            <div key={illust.url} className="border rounded-lg overflow-hidden group">
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
            </div>
          ))}
        </div>
      ) : (
        <p>イラストがまだありません。</p>
      )}
    </div>
  );
}

