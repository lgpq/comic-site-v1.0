import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';

const contentsDir = path.join(process.cwd(), 'contents');

// --- 漫画とイラストの関数 (変更なし) ---
export interface ComicEpisode {
  seriesTitle: string;
  episodeSlug: string;
  title: string;
  date: string;
}
export const getAllComicEpisodes = (): ComicEpisode[] => {
  // (省略) 既存のコードのまま
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
        const data = yaml.load(fileContent) as { title: string; date: string; };
        allEpisodes.push({ seriesTitle: series, episodeSlug: episode, ...data });
      }
    }
  }
  return allEpisodes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
export interface Illustration {
  title: string;
  date: string;
  tags: string[];
  url: string;
}
export function getAllIllustrations(): Illustration[] {
  // (省略) 既存のコードのまま
  const illustrationsPath = path.join(process.cwd(), 'contents/illustrations/meta.yaml');
  try {
    const fileContents = fs.readFileSync(illustrationsPath, 'utf8');
    const data = yaml.load(fileContents) as Illustration[];
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    return [];
  }
}
// ------------------------------------


// --- 日記の関数 (ここからが重要) ---
export interface DiaryEntry {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
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
  const foundEntry = allEntries.find(entry => entry.slug === slug);
  return foundEntry;
}
