"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 静的なパスセグメントと表示名のマッピング
const breadcrumbNameMap: { [key: string]: string } = {
  'comics': '漫画一覧',
  'illustrations': 'イラスト一覧',
  'diary': '日記',
  'sitemap': 'サイトマップ',
  'privacy': 'プライバシーポリシー',
  'contact': 'お問い合わせ',
};

type BreadcrumbsProps = {
  nameMap?: { [key: string]: string };
};

export const Breadcrumbs = ({ nameMap = {} }: BreadcrumbsProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);

  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="パンくずリスト" className="mb-6 text-sm text-gray-500">
      <ol className="flex space-x-2 items-center">
        <li>
          <Link href="/" className="hover:text-sky-500 hover:underline">
            トップ
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const decodedSegment = decodeURIComponent(segment);
          // Use the dynamic nameMap first, then the static map, then fallback to the segment itself
          const label = nameMap[decodedSegment] || breadcrumbNameMap[decodedSegment] || decodedSegment;

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              {isLast ? (
                <span className="font-semibold text-gray-700 dark:text-gray-300" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className="hover:underline hover:text-sky-500">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};