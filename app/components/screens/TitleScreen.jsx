import Button from '../common/Button';
import TitleText from '../common/TitleText';
import ScreenWrapper from '../common/ScreenWrapper';

export default function TitleScreen({ onNavigate }) {
  return (
    <ScreenWrapper>
      {/* タイトル */}
      <TitleText
        mainText={'Banner Swiper'}
        subText={'デザインを直感的に・楽しく・保存しよう！'}
      />

      {/* アプリ説明 */}
      <div className="w-full">
        <div className="overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-100">
          <h3 className="bg-gray-900 p-4 text-center text-2xl font-semibold text-gray-50">
            使い方
          </h3>
          <ul className="p-4 text-sm leading-loose">
            <li>雰囲気を選択して...</li>
            <li>画像のURLを入力</li>
            <li>右にスワイプ → 雰囲気に合ってる！👍</li>
            <li>左にスワイプ → あんまり雰囲気に合わなかった...</li>
            <li>結果を見て、参考バナーを決めよう！</li>
            <li>後からも見返せるようにお気に入りも忘れず💖</li>
          </ul>
        </div>
      </div>

      {/* ボタン */}
      <div className="mt-6 w-full max-w-2xl">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Button onClick={() => onNavigate('input')} variant="primary">
            デザインを探索する
          </Button>
          <Button onClick={() => onNavigate('library')} variant="optional">
            今までのスワイプを見る
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
}
