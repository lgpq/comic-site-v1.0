import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import { ComicEpisode, DiaryEntry, Illustration, ComicSeries } from '@/types';

const contentsDir = path.join(process.cwd(), 'contents');

export const getAllComicEpisodes = (): ComicEpisode[] => {
  const comicsDir = path.join(contentsDir, 'comics');
  const seriesDirs = fs.readdirSync(comicsDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
  const allEpisodes: ComicEpisode[] = [];
  for (const series of seriesDirs) {
    const seriesPath = path.join(comicsDir, series);
    const episodeDirs = fs.readdirSync(seriesPath, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
    for (const episode of episodeDirs) {
      const metaPath = path.join(seriesPath, episode, 'meta.yaml');
      if (fs.existsSync(metaPath)) {
        const fileContent = fs.readFileSync(metaPath, 'utf-8');
        const data = yaml.load(fileContent) as { title: string; date: string; pages?: string[] };
        const thumbnailUrl = data.pages && data.pages.length > 0 ? data.pages[0] : undefined;
        allEpisodes.push({ seriesTitle: series, episodeSlug: episode, thumbnailUrl, ...data });
      }
    }
  }
  return allEpisodes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getComicSeries = (): ComicSeries[] => {
  const comicsDir = path.join(contentsDir, 'comics');
  try {
    const seriesDirs = fs.readdirSync(comicsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    // 先にすべてのエピソード情報を取得する
    const allEpisodes = getAllComicEpisodes();

    const allSeries = seriesDirs.map(seriesSlug => {
      const seriesPath = path.join(comicsDir, seriesSlug);
      const seriesMetaPath = path.join(seriesPath, 'series.yaml');

      let seriesData: Partial<ComicSeries> = { slug: seriesSlug, title: seriesSlug };

      if (fs.existsSync(seriesMetaPath)) {
        const fileContent = fs.readFileSync(seriesMetaPath, 'utf-8');
        const data = yaml.load(fileContent) as Omit<ComicSeries, 'slug' | 'thumbnailUrl'>;
        seriesData = { ...seriesData, ...data };
      }

      // Find the first episode to use its thumbnail
      const episodesInSeries = allEpisodes.filter(ep => ep.seriesTitle === seriesSlug);
      if (episodesInSeries.length > 0) {
        // 日付で昇順ソートして、最も古いエピソード（第1話）を取得
        const firstEpisode = episodesInSeries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
        seriesData.thumbnailUrl = firstEpisode.thumbnailUrl;
      }

      return seriesData as ComicSeries;
    });

    return allSeries;
  } catch (e) {
    console.error("Error reading comic series:", e);
    return [];
  }
};

export function getAllIllustrations(): Illustration[] {
  const illustrationsPath = path.join(process.cwd(), 'contents/illustrations/meta.yaml');
  try {
    const fileContents = fs.readFileSync(illustrationsPath, 'utf8');
    const data = yaml.load(fileContents) as Illustration[];
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    return [];
  }
}

const diaryDir = path.join(process.cwd(), 'contents/diary');

export function getAllDiaryEntries(): DiaryEntry[] {
  try {
    const allEntries: DiaryEntry[] = [];
    const yearDirs = fs.readdirSync(diaryDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory());

    for (const yearDir of yearDirs) {
      const yearPath = path.join(diaryDir, yearDir.name);
      const monthDirs = fs.readdirSync(yearPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

      for (const monthDir of monthDirs) {
        const monthPath = path.join(yearPath, monthDir.name);
        const fileNames = fs.readdirSync(monthPath).filter(file => file.endsWith('.md'));

        for (const fileName of fileNames) {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(monthPath, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          allEntries.push({
            slug,
            content,
            ...(data as { title: string; date: string; tags: string[] }),
          });
        }
      }
    }

    return allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    return [];
  }
}

// 最も安全な方法に修正
export function getDiaryEntryBySlug(slug: string): DiaryEntry | undefined {
  const allEntries = getAllDiaryEntries();
  return allEntries.find(entry => entry.slug === slug);
}
