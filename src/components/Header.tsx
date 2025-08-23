"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/comics", label: "漫画" },
  { href: "/illustrations", label: "イラスト" },
  { href: "/diary", label: "日記" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="font-bold text-xl">
          COMIC-SITE-V1.0
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {navLinks.map((link) => (
              <li key={link.href} >
                <Link
                  href={link.href}
                  className={`hover:text-sky-500 transition-colors ${
                    pathname.startsWith(link.href) ? "text-sky-500 font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};