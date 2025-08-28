import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '送信完了',
  description: 'お問い合わせありがとうございます。',
  // 検索エンジンにインデックスさせないようにする
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksPage() {
  return (
    <div className="text-center max-w-xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-4">お問い合わせありがとうございます</h1>
      <p className="mb-8">内容を確認の上、担当者よりご連絡させていただきます。しばらくお待ちください。</p>
      <Link href="/" className="inline-block bg-sky-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-700 transition-colors">
        トップページに戻る
      </Link>
    </div>
  );
}