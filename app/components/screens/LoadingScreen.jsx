export default function LoadingScreen({ progress, currentCount, totalCount }) {
  return (
    <div className='min-h-screen flex items-center justify-center p-2'>
      <div className='w-full max-w-2xl mx-auto my-auto'>
        {/* タイトル */}
        <div className='text-center mb-4'>
          <h2 className='text-5xl font-bold text-gray-900 mb-2'>ロード中...</h2>
          <p className='text-lg'>
            {currentCount}/{totalCount}
          </p>
        </div>

        {/* 進捗バー */}
        <div className='w-full bg-gray-200 rounded-full h-4 mb-6'>
          <div
            className='bg-blue-500 h-4 rounded-full transition-all duration-500 ease-out'
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* パーセンテージ表示 */}
        <div className='text-center'>
          <p className='text-2xl font-bold text-blue-500'>{progress}%</p>
        </div>
      </div>
    </div>
  );
}
