export default function ContactPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">お問い合わせ</h2>
      <div className="prose dark:prose-invert max-w-none space-y-4">
        <p>
          ご意見、ご感想、お仕事のご依頼などは、以下の連絡先までお願いいたします。
        </p>
        <p>
          メール: <a href="mailto:your-email@example.com" className="text-sky-500 hover:underline">your-email@example.com</a>
        </p>
        <p>
          X (旧Twitter): <a href="https://twitter.com/your-account" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">@your-account</a>
        </p>
      </div>
    </div>
  );
}