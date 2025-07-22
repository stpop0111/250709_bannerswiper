import Button from '../common/Button';

export default function InputScreen({
  inputUrls,
  setInputUrls,
  handleUrlSubmit,
}) {
  return (
  <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full'>
    <h2 className='text-2xl font-bold text-center mb-6'>
      画像URLを入力してください
    </h2>

    <div className='mb-4'>
      <textarea
        value={inputUrls}
        onChange={(e) => setInputUrls(e.target.value)}
        placeholder={`example.com
example.com
example.com`}
        className='w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        onError={(e) => {
          e.target.src = '/test01.jpg'
        }}
      />
    </div>
    <Button onClick={handleUrlSubmit} variant='primary'>
      スワイプ開始！
    </Button>
  </div>
  )
}
