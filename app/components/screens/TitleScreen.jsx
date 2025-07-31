import Button from '../common/Button';

export default function TitleScreen({ onNavigate }) {
  return (
    <div className='min-h-screen flex items-center justify-center p-2'>
      <div className='w-full max-w-2xl mx-auto my-auto'>
        {/* タイトル */}
        <div className='text-center mb-4'>
          <h1 className='text-5xl font-bold text-gray-900 mb-2'>
            Banner Swiper
          </h1>
          <p className='text-lg'>デザインを直感的に・楽しく・保存しよう！</p>
        </div>

        {/* アプリ説明 */}
        <div className='w-full'>
          <div className='bg-gray-100 rounded-lg border-2 overflow-hidden border-gray-300'>
            <h3 className='text-center font-semibold text-2xl bg-gray-900 text-gray-50 p-4'>
              使い方
            </h3>
            <ul className='p-4 text-sm leading-loose'>
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
        <div className='w-full max-w-2xl mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <Button onClick={() => onNavigate('input')} variant='primary'>
              デザインを探索する
            </Button>
            <Button onClick={() => onNavigate('library')} variant='optional'>
              今までのスワイプを見る
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
