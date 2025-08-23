# comic-site-v1.0

## 推奨ファイル構成例

```
comic-site-v1.0/
├── public/
│   ├── placeholder.jpg         # サンプル画像やNo Image用（必要なら）
├── src/
│   ├── pages/
│   │   ├── index.tsx          # トップページ
│   │   ├── comics/            # 漫画関連ページ
│   │   ├── illustrations/     # イラストギャラリー
│   │   └── diary/             # 日記ページ
│   ├── components/            # Reactコンポーネント
│   └── utils/                 # 各種ユーティリティ
├── contents/
│   ├── comics/
│   │   └── my-manga/
│   │       ├── episode-01/
│   │       │   └── meta.yaml  # 画像URLや話情報を記載
│   │       └── episode-02/
│   │           └── meta.yaml
│   ├── illustrations/
│   │   └── meta.yaml          # イラストの画像URLや説明
│   └── diary/
│       ├── 2024-08-11.md      # 日記本文（Markdown）
│       └── 2024-08-12.md
├── README.md
├── ROADMAP.md
├── CHECKLIST.md
├── FLOW.md
└── ...（Next.jsやViteの設定ファイルなど）
```

### meta.yaml の例

```yaml
title: 第1話「はじまり」
date: 2024-08-11
tags: [冒険, ファンタジー]
pages:
  - https://your-s3-bucket.s3.amazonaws.com/my-manga/episode-01/001.jpg
  - https://your-s3-bucket.s3.amazonaws.com/my-manga/episode-01/002.jpg
```

> 画像ファイルは AWS S3 等の外部ストレージにアップロードし、  
> meta.yaml や Markdown ファイルで URL を管理します。

---

## 開発用コマンド

### 開発サーバーの起動

```bash
npm run dev
```

### コンテンツの自動生成

#### 新しい漫画シリーズの作成

```bash
# 使用法: npm run new:series <シリーズ名>
npm run new:series my-manga 5
```

#### 新しい漫画エピソードの作成

```bash
# 使用法: npm run new:episode <シリーズ名> <話数>
npm run new:episode my-manga 5
```

#### 新しい日記の作成

```bash
# 使用法: npm run new:diary "日記のタイトル"
npm run new:diary "今日のできごと"
```

---
