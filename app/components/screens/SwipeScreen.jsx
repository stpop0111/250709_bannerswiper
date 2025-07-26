import Button from '../common/Button';

export default function SwipeScreen({
  imageRef,
  images,
  currentIndex,
  animateChoice,
  previousImage,
  changeInput,
}) {
  return (
    <div className='min-h-screen flex items-center justify-center p-2'>
      <div className='w-full max-w-2xl mx-auto my-auto'>
        {/* 進捗 */}
        <div className='text-center mb-2'>
          <p className='text-gray-600 font-bold'>
            <span className='text-xl'>{currentIndex + 1}</span> /{' '}
            <span className='text-red-400'>{images.length}</span>
          </p>
        </div>
        {/* 画像表示エリア */}
        <div className='mb-6'>
          <div className=''>
            <img
              ref={imageRef}
              src={images[currentIndex]}
              alt={`image ${currentIndex + 1}`}
              className='h-full object-cover m-auto'
              style={{ touchAction: 'none' }}
            />
          </div>
        </div>
        {/* ボタン */}
        <div className='m-auto top-[100%]'>
          <div className='flex gap-3 justify-center mb-4'>
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

          {/* オプショナルボタン */}
          <div className='flex gap-3 justify-center mt-6'>
            <Button onClick={changeInput} variant='optional' buttonWidth='full'>
              入力に戻る
            </Button>
            <Button
              onClick={previousImage}
              variant='optional'
              buttonWidth='full'
            >
              ひとつ戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
