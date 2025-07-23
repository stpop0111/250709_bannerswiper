import Button from '../common/Button';

export default function SwipeScreen({
  imageRef,
  images,
  currentIndex,
  animateChoice,
  changeInput,
}) {
  return (
    <>
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-7xl w-full h-full'>
        {/* 画像表示エリア */}
        <div className='h-[400px] mb-6'>
          <img
            ref={imageRef}
            src={images[currentIndex]}
            alt={`image ${currentIndex + 1}`}
            className='h-full object-cover rounded-lg'
            style={{ touchAction: 'none' }}
          />
        </div>
        {/* 進捗表示 */}
        <div className='text-center mb-4'>
          <p className='text-gray-600 mb-2'>
            <span className='text-xl'>{currentIndex + 1}</span> /{' '}
            <span className='text-red-400'>{images.length}</span>
          </p>

          {/* ボタン */}
          <div className='flex gap-3'>
            <Button
              onClick={() => animateChoice('disLike', 'left')}
              variant='dislike'
            >
              ✖
            </Button>
            <Button
              onClick={() => animateChoice('like', 'right')}
              variant='like'
            >
              ❤
            </Button>
          </div>

          {/* 入力に戻る */}
          <div className='mt-4'>
            <Button onClick={changeInput} variant='optional'>
              入力に戻る
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
