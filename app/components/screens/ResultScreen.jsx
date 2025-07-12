import Button from '../common/Button';

export default function ResultScreen({ results, backToInput }) {
  <div className='bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full'>
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
    <div className='mt-4'>
      <Button onClick={backToInput} variant='optional'>
        入力に戻る
      </Button>
    </div>
  </div>;
}
