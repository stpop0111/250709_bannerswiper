import Button from '../common/Button';

export default function ResultScreen({ results, changeInput }) {
  return (
    <div className='w-full'>
      <div className='bg-white rounded-lg p-4'>
        <h2 className='text-2xl font-bold text-center mb-6'>選んだバナー</h2>
        {/* 画像表示 */}
        <div className='grid grid-cols-4 gap-4 mb-6'>
          {results
            .filter((result) => result.choice === 'like')
            .map((result, index) => (
              <div key={index} className='relative'>
                <img
                  src={result.image}
                  alt={`好きな画像 ${index + 1}`}
                  className='w-full object-cover'
                />
                <span className='absolute top-2 right-2 px-2 py-1 rounded text-sm'>
                  💖
                </span>
              </div>
            ))}
        </div>
        {/* ボタン */}
        <div className='max-w-2xl m-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <Button onClick={changeInput} variant='optional'>
              入力に戻る
            </Button>
            <Button onClick={changeInput} variant='optional'>
              保存する
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
