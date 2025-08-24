import Link from 'next/link';

export default function SitemapPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">サイトマップ</h2>
      <ul className="space-y-4 list-disc list-inside">
        <li>
          <Link href="/" className="hover:text-sky-500 hover:underline">
            トップページ
          </Link>
        </li>
        <li>
          <Link href="/comics" className="hover:text-sky-500 hover:underline">
            漫画一覧
          </Link>
        </li>
        <li>
          <Link href="/illustrations" className="hover:text-sky-500 hover:underline">
            イラスト一覧
          </Link>
        </li>
        <li>
          <Link href="/diary" className="hover:text-sky-500 hover:underline">
            日記
          </Link>
        </li>
      </ul>
    </div>
  );
}