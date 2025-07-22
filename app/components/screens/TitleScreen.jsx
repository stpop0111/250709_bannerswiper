import Button from "../common/Button"

export default function TitleScreen ({changeInput, changeLibrary}) {
  return(
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl">
      {/* タイトル */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Banner Swiper</h1>
        <p className="text-lg">デザインを直感的に・楽しく・保存しよう！</p>
      </div>

      {/* アプリ説明 */}
      <div className="mb-8">
        <div className="m-auto max-w-5xl">
          <div className="bg-gray-100 rounded-lg border-2 overflow-hidden border-gray-300">
            <h3 className="text-center font-semibold text-2xl bg-gray-900 text-gray-50 p-4">使い方</h3>
            <ul className="p-4 text-xl leading-loose">
              <li>雰囲気を選択して...</li>
              <li>画像のURLを入力</li>
              <li>右にスワイプ → 雰囲気に合ってる！👍</li>
              <li>左にスワイプ → あんまり雰囲気に合わなかった...</li>
              <li>結果を見て、参考バナーを決めよう！</li>
              <li>後からも見返せるようにお気に入りも忘れず💖</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ボタン */}
      <div className="max-w-2xl m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button onClick={changeInput} variant='primary'>
            デザインを探索する
          </Button>
          <Button onClick={changeLibrary} variant='optional'>
            今までのスワイプを見る
          </Button>
        </div>
      </div>

    </div>
  )
}