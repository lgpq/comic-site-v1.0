"use client";

import Link from 'next/link';

type Props = {
  totalPages: number;
  currentPage: number;
  basePath: string;
};

export function Pagination({ totalPages, currentPage, basePath }: Props) {
  const getPaginationItems = () => {
    const items: (number | '...')[] = [];
    const pageRange = 2; // 現在のページの前後に表示するページ数

    if (totalPages <= 1) return [];

    // 常に最初のページを表示
    items.push(1);

    // ... の表示 (左側)
    if (currentPage > pageRange + 2) {
      items.push('...');
    }

    // 中間のページ番号
    const start = Math.max(2, currentPage - pageRange);
    const end = Math.min(totalPages - 1, currentPage + pageRange);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    // ... の表示 (右側)
    if (currentPage < totalPages - pageRange - 1) {
      items.push('...');
    }

    // 常に最後のページを表示
    items.push(totalPages);

    // 重複を削除 (例: totalPagesが少ない場合)
    return [...new Set(items)];
  };

  const paginationItems = getPaginationItems();

  return (
    <nav className="flex justify-center items-center space-x-2 mt-12">
      {currentPage > 1 && (
        <Link href={currentPage === 2 ? basePath : `${basePath}/page/${currentPage - 1}`} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          &lt;
        </Link>
      )}
      {paginationItems.map((item, index) =>
        item === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
        ) : (
          <Link
            key={item}
            href={item === 1 ? basePath : `${basePath}/page/${item}`}
            className={`px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
              currentPage === item ? 'bg-sky-500 text-white border-sky-500' : ''
            }`}
          >
            {item}
          </Link>
        )
      )}
      {currentPage < totalPages && (
        <Link href={`${basePath}/page/${currentPage + 1}`} className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          &gt;
        </Link>
      )}
    </nav>
  );
}