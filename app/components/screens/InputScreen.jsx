import Button from '../common/Button';

export default function InputScreen({
  inputUrls,
  setInputUrls,
  handleUrlSubmit,
  changeTitle,
}) {
  return (
    <div>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-center'>探求に行きましょう。</h2>
        <p>画像URLを入力するか、インポートする形式を選んでください。</p>
      </div>

      {/* 入力エリア */}
      <div className='mb-6 p-4 border bg-white border-gray-300 rounded-lg '>
        <textarea
          value={inputUrls}
          placeholder={`画像URLを入力：
https://example.com/image1.jpg
https://example.com/image2.jpg
https://example.com/image3.jpg
      `}
          className='w-full min-h-[120px] max-h-[400px] resize-none overflow-hidden border-none outline-none'
          onChange={(e) => setInputUrls(e.target.value)}
          onError={(e) => {
            e.target.src = '/test01.jpg';
          }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />

        {/* ボタン */}
        <div className='flex justify-between items-end w-full'>
          <button className='w-8 h-8 border-1 border-gray-600 rounded-lg'>
            +
          </button>
          <Button onClick={handleUrlSubmit} variant='primary'>
            スワイプ開始！
          </Button>
        </div>
      </div>

      {/* タイトルに戻るボタン */}
      <div className='max-w-2xl m-auto'>
        <Button onClick={changeTitle} variant='optional'>
          タイトルに戻る
        </Button>
      </div>
    </div>
  );
}
