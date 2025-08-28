import fs from "fs";
import path from "path";

// スクリプトの引数を取得 (node, script.js, series, episode)
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("エラー: シリーズ名とエピソード番号を指定してください。");
  console.log("使用法: npm run new:episode <series-name> <episode-number>");
  process.exit(1);
}

const [seriesName, episodeNumber] = args;
const paddedEpisodeNumber = episodeNumber.padStart(2, "0");
const episodeDirName = `episode-${paddedEpisodeNumber}`;

const episodePath = path.join(
  process.cwd(),
  "contents",
  "comics",
  seriesName,
  episodeDirName
);

if (fs.existsSync(episodePath)) {
  console.error(`エラー: ディレクトリ ${episodePath} は既に存在します。`);
  process.exit(1);
}

fs.mkdirSync(episodePath, { recursive: true });

const today = new Date().toISOString().split("T")[0];

const metaTemplate = `title: "第${episodeNumber}話 YOUR_TITLE_HERE"
date: "${today}"
tags: []
pages:
  - "YOUR_IMAGE_URL_HERE_1.jpg"
  - "YOUR_IMAGE_URL_HERE_2.jpg"
`;

const metaPath = path.join(episodePath, "meta.yaml");
fs.writeFileSync(metaPath, metaTemplate);

console.log(`✅ エピソードを作成しました: ${episodePath}`);
