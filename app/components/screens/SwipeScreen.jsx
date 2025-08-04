import Button from '../common/Button';
import MoodDisplay from '../common/MoodDisplay';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(Draggable);


export default function SwipeScreen({
  images,
  onComplete,
  onNavigate,
  selectedMoods,
}) {
  // 状態管理の宣言
  const [currentIndex, setCurrentIndex] = useState(0); // 現在の画像番号
  const [results, setResults] = useState([]); // 判定結果の保存
  const imageRef = useRef(null); // 画像要素の直接参照
  const [imageSize, setImageSize] = useState('w-full'); //画面サイズの保存

  // 画像のアスペクト比計算
  // =======================================
  const handleImageLoad = (e) => {
    const img = e.target;
    const aspectRatio = img.naturalWidth / img.naturalHeight;

    // アスペクト比が1を超えている場合
    if (aspectRatio > 1) {
      setImageSize('w-full'); // 横長画像
    } else {
      setImageSize('h-full'); // 縦長画像
    }
  };
  // 画像切り替え時のリセット
  useEffect(() => {
    setImageSize('w-full');
  }, [currentIndex]);

  // スワイプの処理
  // =======================================
  const initializeDraggable = () => {
    Draggable.get(imageRef.current)?.kill(); // imageRefについている"Draggable"を削除
    if (!imageRef.current) return;

    // ドラッグの挙動
    Draggable.create(imageRef.current, {
      type: 'x',
      bounds: { minX: -200, maxX: 200 },

      // ドラッグ中
      onDrag: function () {
        const x = this.x;
        const maxDistance = 200;
        const progress = Math.abs(x) / maxDistance;

        gsap.set(imageRef.current, {
          opacity: 1 - progress * 0.8,
          scale: Math.max(1 - progress * 0.8, 0.8),
          rotation: x * 0.15,
        });
      },

      // ドラッグを離した時
      onDragEnd: function () {
        const x = this.x;
        const threshold = 150; // 許容値

        if (x > threshold) {
          // 右にドラッグした時 -> 右に行く
          animateChoice('like', 'right');
        } else if (x < -threshold) {
          // 左にドラッグした時 -> 左に行く
          animateChoice('disLike', 'left');
        } else {
          //どちらでもない（中途半端）な時 -> 元に戻す
          gsap.to(imageRef.current, {
            x: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.3,
            ease: 'elastic.out',
          });
        }
      },
    });
  };

  // スワイプ後のアニメーション処理
  // =======================================
  const animateChoice = (choice, direction) => {
    gsap.to(imageRef.current, {
      x: direction === 'right' ? 400 : -400,
      rotation: direction === 'right' ? 30 : -30,
      opacity: 0,
      duration: 0.6,
      ease: 'power4.out',
      onComplete: () => {
        handleChoise(choice);
        // 次の画像のためにリセット
        gsap.set(imageRef.current, {
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
        });
      },
    });
  };

  // 選択処理（スワイプ時の選択をresult配列に入れる）
  // =======================================
  const handleChoise = (choice) => {
    // 選択肢とその画像をnewResultオブジェクトに入れる
    const newResult = {
      image: images[currentIndex],
      choice: choice,
    };

    // resultsにnewResultオブジェクトを入れる
    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    // 次の画像に進む or 結果表示
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(updatedResults); // 親コンポーネントに値を返す
    }
  };

  // 一つ前の画像に戻る
  // =======================================
  const previousImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setResults((prevResults) => prevResults.slice(0, -1));
    } else {
      alert('これ以上前の画像はありません');
    }
  };

  // マウント関係
  useEffect(() => {
    initializeDraggable();
    return () => {
      Draggable.get(imageRef.current)?.kill();
    };
  }, [currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center p-2'>
        <div className='text-center'>
          <p className='text-xl text-gray-600 mb-4'>画像がありません</p>
          <Button onClick={() => onNavigate('input')} variant='optional'>
            入力に戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-2'>
      <div className='w-full max-w-2xl mx-auto my-auto'>
        {/* 選択した雰囲気 */}
        <MoodDisplay selectedMoods={selectedMoods} />
        {/* 進捗 */}
        <div className='text-center mb-2'>
          <p className='text-gray-600 font-bold'>
            <span className='text-xl'>{currentIndex + 1}</span> /{' '}
            <span className='text-red-400'>{images.length}</span>
          </p>
        </div>
        {/* 画像表示エリア */}
        <div className='mb-6 flex items-center justify-center'>
          <div className='p-4 bg-white h-[50vh] aspect-square flex justify-center items-center'>
            <img
              ref={imageRef}
              src={images[currentIndex]}
              alt={`image ${currentIndex + 1}`}
              className={`object-cover ${imageSize}`}
              style={{ touchAction: 'none' }}
              onLoad={handleImageLoad}
              onError={(e) => {
                e.target.src = '/test01.jpg';
              }}
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
            <Button
              onClick={() => onNavigate('input')}
              variant='optional'
              buttonWidth='full'
            >
              入力に戻る
            </Button>
            <Button
              onClick={previousImage}
              variant='optional'
              buttonWidth='full'
            >
              ひとつ戻る({results.length}個を選択済み)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
