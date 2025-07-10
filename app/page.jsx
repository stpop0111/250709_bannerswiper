'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import Button from './components/common/Button';

gsap.registerPlugin(Draggable);

export default function Home() {
  // 画面モードの管理
  const [mode, setMode] = useState('input'); //画面モードの状態管理
  const [inputUrls, setInputUrls] = useState(''); //urlの入力
  // 画像の配列
  const [images, setImages] = useState([
    '/test01.jpg',
    '/test02.jpg',
    '/test03.jpg',
  ]);

  const [currentIndex, setCurrentIndex] = useState(0); // 現在の画像のインデックス
  const [results, setResults] = useState([]); // 判定結果の保存
  const imageRef = useRef(null); // 画像要素の直接参照

  const handleUrlSubmit = () => {
    if (!inputUrls.trim()) {
      alert('画像URLを入力してください');
      return;
    }

    // 改行でURLを分割 -> 配列にセットする
    const urlArray = inputUrls
      .split('\n')
      .filter((url) => url.trim() !== '')
      .map((url) => url.trim());

    setImages(urlArray);
    setCurrentIndex(0);
    setResults([]);
    setMode('swipe');
  };

  const backToInput = () => {
    setMode('input');
    setCurrentIndex(0);
    setResults([]);
  };

  // マウント関係
  useEffect(() => {
    initializeDraggable();
  }, [currentIndex, mode]);

  const initializeDraggable = () => {
    Draggable.get(imageRef.current)?.kill(); // imageRefについている"Draggable"を削除
    Draggable.create(imageRef.current, {
      type: 'x',
      bounds: { minX: -200, maxX: 200 },

      // ドラッグ中の挙動
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

      // ドラッグを離した時の挙動
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

  const animateChoice = (choice, direction) => {
    gsap.to(imageRef.current, {
      x: direction === 'right' ? 400 : -400,
      rotation: direction === 'right' ? 30 : -30,
      opacity: 0,
      duration: 0.6,
      ease: 'power4.out',
      onComplete: () => {
        handleChoise(choice);
        gsap.set(imageRef.current, {
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
        });
      },
    });
  };

  // 選択時の処理
  const handleChoise = (choice) => {
    const newResult = {
      image: images[currentIndex],
      choice: choice,
    };
    setResults([...results, newResult]);
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setMode('result');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      {/* URL入力画面 */}
      {mode === 'input' && (
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
            />
          </div>
          <Button onClick={handleUrlSubmit} variant='primary'>
            スワイプ開始！
          </Button>
        </div>
      )}
      {/* スワイプ画面 */}
      {mode === 'swipe' && (
        <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full'>
          {/* 戻るボタン */}
          {/* 画像表示エリア */}
          <div className='mb-6'>
            <img
              ref={imageRef}
              src={images[currentIndex]}
              alt={`image ${currentIndex + 1}`}
              className='w-full object-cover rounded-lg'
              style={{ touchAction: 'none' }}
            />
          </div>

          {/* 進捗表示 */}
          <div className='text-center mb-4'>
            <p className='text-gray-600 mb-2'>
              <span className='text-xl'>{currentIndex + 1}</span> / <span className='text-red-400'>{images.length}</span>
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
              <Button onClick={backToInput} variant='optional'>
                入力に戻る
              </Button>
            </div>
          </div>
        </div>
      )}{' '}
      {/* //スワイプ画面 */}
      {/* 結果画面 */}
      {mode === 'result' && (
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
        </div>
      )}
      {/* //結果画面 */}
    </div>
  );
}
