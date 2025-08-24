import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t mt-12 py-8 text-sm text-gray-500 dark:text-gray-400">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <p>&copy; {new Date().getFullYear()} lgpq. All rights reserved.</p>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/sitemap" className="hover:text-sky-500 hover:underline">
                サイトマップ
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-sky-500 hover:underline">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sky-500 hover:underline">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};