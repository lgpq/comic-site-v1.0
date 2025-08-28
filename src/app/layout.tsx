import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getComicSeries, getAllComicEpisodes, getAllDiaryEntries } from "@/utils/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'COMIC-SITE-V1.0',
    template: '%s | COMIC-SITE-V1.0',
  },
  description: 'lgpqによる漫画・イラスト・日記を公開するポートフォリオサイト。',
  openGraph: {
    title: 'COMIC-SITE-V1.0',
    description: 'lgpqによる漫画・イラスト・日記を公開するポートフォリオサイト。',
    // TODO: ご自身のドメインに置き換えてください
    url: 'https://your-domain.com',
    siteName: 'COMIC-SITE-V1.0',
    images: [
      {
        // TODO: デフォルトのOGP画像へのパスに置き換えてください
        url: 'https://your-domain.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  // TODO: 必要に応じてTwitterカード用の設定も追加してください
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch all data on the server to build a name map for breadcrumbs
  const allSeries = getComicSeries();
  const allEpisodes = getAllComicEpisodes();
  const allDiaryEntries = getAllDiaryEntries();

  // Create a map from slug to title
  const nameMap: { [key: string]: string } = {};
  allSeries.forEach(series => {
    nameMap[series.slug] = series.title;
  });
  allEpisodes.forEach(episode => {
    nameMap[episode.episodeSlug] = episode.title;
  });
  allDiaryEntries.forEach(entry => {
    nameMap[entry.slug] = entry.title;
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white dark:bg-gray-900`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-grow container p-4">
            <Breadcrumbs nameMap={nameMap} />
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
