import { getAllIllustrations } from '@/utils/content';
import { IllustrationList } from '@/components/IllustrationList';

export default function IllustrationsPage() {
  const illustrations = getAllIllustrations();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">イラスト一覧</h2>
      <IllustrationList illustrations={illustrations} />
    </div>
  );
}

