'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import Button from './components/common/Button';
import InputScreen from './components/screens/InputScreen';
import SwipeScreen from './components/screens/SwipeScreen';
import ResultScreen from './components/screens/ResultScreen';
import TitleScreen from './components/screens/TitleScreen';
import LibraryScreen from './components/screens/LibraryScreen';

gsap.registerPlugin(Draggable);

export default function Home() {
  // 画面モードの管理
  const [mode, setMode] = useState('title'); //画面モードの状態管理
  const [inputUrls, setInputUrls] = useState(''); //urlの入力
  // 画像の配列
  const [images, setImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0); // 現在の画像のインデックス
  const [results, setResults] = useState([]); // 判定結果の保存
  const imageRef = useRef(null); // 画像要素の直接参照

  // 画像URLを記入時
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

  const changeScreen = (screenName) => {
    setMode(screenName);
  }

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
      {/* タイトル画面 */}
      {mode === 'title' && (
        <TitleScreen
          changeInput={() => changeScreen('input')}
          changeLibrary={() => changeScreen('library')}/>
      )}

      {/* URL入力画面 */}
      {mode === 'input' && (
        <InputScreen
          inputUrls={inputUrls}
          setInputUrls={setInputUrls}
          handleUrlSubmit={handleUrlSubmit}
          changeTitle={() => changeScreen('title')}
        />
      )}

      {/* スワイプモード */}
      {mode === 'swipe' && (
        <SwipeScreen
          imageRef={imageRef}
          images={images}
          currentIndex={currentIndex}
          animateChoice={animateChoice}
          backToInput={backToInput}
        />
      )}

      {/* 結果画面 */}
      {mode === 'result' && (
        <ResultScreen results={results} backToInput={backToInput} />
      )}

      {/* ライブラリー */}
      {mode === 'library' && (
        <LibraryScreen
          changeTitle={() => changeScreen('title')}
        />
      )}

    </div>
  );
}
