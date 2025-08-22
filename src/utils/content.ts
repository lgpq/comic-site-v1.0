import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

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