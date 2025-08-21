import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">COMIC-SITE-V1.0</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/comics" className="hover:text-gray-300">漫画</Link></li>
            <li><Link href="/illustrations" className="hover:text-gray-300">イラスト</Link></li>
            <li><Link href="/diary" className="hover:text-gray-300">日記</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};