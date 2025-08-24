export default function PrivacyPolicyPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">プライバシーポリシー</h2>
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>
          当サイトでは、利用者様の個人情報保護の重要性について認識し、個人情報の保護に関する法律（「個人情報保護法」）を遵守すると共に、以下のプライバシーポリシーに従い、適切な取扱い及び保護に努めます。
        </p>
        <section>
          <h3 className="text-xl font-semibold">1. 個人情報の定義</h3>
          <p>
            本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます。）、もしくは個人識別符号が含まれる情報を意味するものとします。
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">2. 個人情報の利用目的</h3>
          <p>
            当サイトでは、利用者様からご提供いただく情報を、以下の目的の範囲内において利用します。
          </p>
          <ul className="list-disc list-inside">
            <li>ご本人様確認のため</li>
            <li>お問い合わせ対応のため</li>
            <li>当サイトのサービス向上・改善、新サービス開発のため</li>
            <li>利用規約に違反する行為への対応のため</li>
          </ul>
        </section>
        <section>
          <h3 className="text-xl font-semibold">3. 個人情報の第三者提供</h3>
          <p>
            当サイトは、利用者様からご提供いただいた個人情報を、個人情報保護法その他の法令に基づき開示が認められる場合を除き、ご本人様の同意を得ずに第三者に提供することはありません。
          </p>
        </section>
        <section>
          <h3 className="text-xl font-semibold">4. プライバシーポリシーの変更</h3>
          <p>
            当サイトは、必要に応じて、本プライバシーポリシーを変更いたします。なお、本プライバシーポリシーを変更する場合は、その内容を当サイト上で表示いたします。
          </p>
        </section>
      </div>
    </div>
  );
}