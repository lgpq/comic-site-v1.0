import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import matter from 'gray-matter';

const contentsDir = path.join(process.cwd(), 'contents');

export interface ComicEpisode {
  seriesTitle: string;
  episodeSlug: string;
  title: string;
  date: string;
}

export const getAllComicEpisodes = (): ComicEpisode[] => {
  const comicsDir = path.join(contentsDir, 'comics');
  const seriesDirs = fs.readdirSync(comicsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const allEpisodes: ComicEpisode[] = [];

  for (const series of seriesDirs) {
    const seriesPath = path.join(comicsDir, series);
    const episodeDirs = fs.readdirSync(seriesPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const episode of episodeDirs) {
      const metaPath = path.join(seriesPath, episode, 'meta.yaml');
      if (fs.existsSync(metaPath)) {
        const fileContent = fs.readFileSync(metaPath, 'utf-8');
        const data = yaml.load(fileContent) as { title: string; date: string };
        allEpisodes.push({ seriesTitle: series, episodeSlug: episode, ...data });
      }
    }
  }

  return allEpisodes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// イラスト
export interface Illustration {
  title: string;
  date: string;
  tags: string[];
  url: string;
}

export function getAllIllustrations(): Illustration[] {
  const illustrationsPath = path.join(process.cwd(), 'contents/illustrations/meta.yaml');
  try {
    const fileContents = fs.readFileSync(illustrationsPath, 'utf8');
    const data = yaml.load(fileContents) as Illustration[];
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    // ファイルが存在しない場合は空配列を返す
    return [];
  }
}

// 日記
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
    const fileNames = fs.readdirSync(diaryDir).filter(
      (file) => file.endsWith('.md')
    );
    const allEntries = fileNames.map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(diaryDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...(data as { title: string; date: string; tags: string[] }),
      };
    });

    return allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    return [];
  }
}

export function getDiaryEntryBySlug(slug: string): DiaryEntry | undefined {
  const fullPath = path.join(diaryDir, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      slug,
      content,
      ...(data as { title: string; date: string; tags: string[] }),
    };
  } catch (e) {
    return undefined;
  }
}