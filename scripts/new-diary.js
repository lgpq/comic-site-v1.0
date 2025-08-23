const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (args.length < 1) {
  console.error("エラー: 日記のタイトルを指定してください。");
  console.log('使用法: npm run new:diary "日記のタイトル"');
  process.exit(1);
}

const [title] = args;

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const dateStr = `${year}-${month}-${day}`;

// ファイル名をURLフレンドリーにする（簡易的な例）
const slug = `${dateStr}-${title.toLowerCase().replace(/\s+/g, "-")}`;

const diaryDirPath = path.join(
  process.cwd(),
  "contents",
  "diary",
  String(year),
  month
);

// 年/月のディレクトリがなければ作成
fs.mkdirSync(diaryDirPath, { recursive: true });

const filePath = path.join(diaryDirPath, `${slug}.md`);

const template = `---
title: "${title}"
date: "${dateStr}"
tags: []
---

ここに本文を記述します。
`;

fs.writeFileSync(filePath, template);

console.log(`✅ 日記を作成しました: ${filePath}`);
