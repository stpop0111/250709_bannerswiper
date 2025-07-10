'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

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
      .filter((url) => url.trim() === '')
      .map((url) => url.trim());

    setImages(
      urlArray.length > 0 ? ['/test01.jpg', '/test02.jpg', '/test03.jpg'] : []
    );
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
  }, [currentIndex]);

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
          y: 10,
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
          animateChoice('好き!', 'right');
        } else if (x < -threshold) {
          // 左にドラッグした時 -> 左に行く
          animateChoice('良くない', 'left');
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
      duration: 1,
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
      alert('完了！結果を確認してください');
      console.log('最終結果：', results);
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
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              参考にしたいURL
            </label>
            <textarea
              value={inputUrls}
              onChange={(e) => setInputUrls(e.target.value)}
              placeholder={`example.com
example.com
example.com`}
              className='w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <button
            onClick={handleUrlSubmit}
            className='w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-600 transition-colors'
          >
            スワイプ開始！
          </button>
        </div>
      )}

      {/* スワイプ画面 */}
      {mode === 'swipe' && (
        <div className='bg-white rounded-lg shadow-lg p-6 max-w-md w-full'>
          {/* 戻るボタン */}
          <div className="mb-4">
            <button
              onClick={backToInput}
              className='text-gray-800 bg-gray-400 hover:bg-gray-700 hover:text-gray-400 py-4 px-3 rounded-lg transition-colors'
            >
              入力に戻る
            </button>
          </div>
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
            <p className='text-gray-600'>
              {currentIndex + 1} / {images.length}
            </p>

            {/* ボタン */}
            <div className='flex gap-3'>
              <button
                onClick={() => animateChoice('これじゃない', 'left')}
                className='w-full bg-red-500 text-white py-6 px-6 rounded-lg font-bold hover:bg-red-600'
              >
                これじゃない
              </button>
              <button
                onClick={() => animateChoice('好き!', 'right')}
                className='w-full bg-green-500 text-white py-6 px-6 rounded-lg font-bold hover:bg-green-600'
              >
                好き！
              </button>
            </div>
          </div>

          {/* 結果表示 */}
          {results.length > 0 && (
            <div className='mt-6 p-4 bg-white rounded-lg shadow max-w-md w-full'>
              <h3 className='font-bold mb-2'>結果：</h3>
              {results.map((result, index) => (
                <div className='text-sm' key={index}>
                  {result.image} : {result.choice}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
