import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'ご意見、ご感想、お仕事のご依頼などはこちらからお願いいたします。',
};

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">お問い合わせ</h1>
      <form
        action="https://formspree.io/f/xzzabooo" // <-- ここを先ほどコピーしたFormspreeのEndpoint URLに置き換えてください
        method="POST"
        className="max-w-xl mx-auto space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            お名前
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            メールアドレス
          </label>
          <input
            type="email"
            name="_replyto" // Formspreeで「返信先」として認識させるために`_replyto`を使います
            id="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            お問い合わせ内容
          </label>
          <textarea
            name="message"
            id="message"
            rows={6}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
}