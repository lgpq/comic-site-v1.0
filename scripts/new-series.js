import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("エラー: シリーズ名を指定してください。");
  console.log("使用法: npm run new:series <series-name>");
  process.exit(1);
}

const [seriesName] = args;

const seriesPath = path.join(process.cwd(), "contents", "comics", seriesName);

if (fs.existsSync(seriesPath)) {
  console.error(`エラー: ディレクトリ ${seriesPath} は既に存在します。`);
  process.exit(1);
}

// Create series directory
fs.mkdirSync(seriesPath, { recursive: true });

// Create series.yaml
const seriesTemplate = `title: "YOUR_SERIES_TITLE_HERE"
author: "YOUR_NAME_HERE"
description: "A brief description of the series."
`;
const seriesMetaPath = path.join(seriesPath, "series.yaml");
fs.writeFileSync(seriesMetaPath, seriesTemplate);
console.log(`✅ 新しいシリーズの設定ファイルを作成しました: ${seriesMetaPath}`);

// Create episode-01 directory and its meta.yaml
const episodeDirName = "episode-01";
const episodePath = path.join(seriesPath, episodeDirName);
fs.mkdirSync(episodePath, { recursive: true });

const today = new Date().toISOString().split("T")[0];
const episodeMetaTemplate = `title: "第1話 YOUR_TITLE_HERE"
date: "${today}"
tags: []
pages:
  - "YOUR_IMAGE_URL_HERE_1.jpg"
  - "YOUR_IMAGE_URL_HERE_2.jpg"
`;
const episodeMetaPath = path.join(episodePath, "meta.yaml");
fs.writeFileSync(episodeMetaPath, episodeMetaTemplate);

console.log(`✅ 第1話の雛形を作成しました: ${episodeMetaPath}`);
