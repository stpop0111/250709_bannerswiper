'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

import Button from './components/common/Button';
import FadeTransition from './components/animations/FadeTransition';

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
  const [images, setImages] = useState([]); // 画像の配列

  const [currentIndex, setCurrentIndex] = useState(0); // 現在の画像のインデックス
  const [results, setResults] = useState([]); // 判定結果の保存
  const imageRef = useRef(null); // 画像要素の直接参照

  const [savedSessions, setsavedSessions] = useState([]); // セッション一覧の管理

  // ローカルストレージへのデータ保存
  const saveToLocalStorage = (sessionData) => {
    try {
      // 既存のセッションを取得
      const existingSessions = JSON.parse(
        localStorage.getItem('bannerSessions') || '[]'
      );
      // 既存のセッションに新規のセッションを追加
      const updatedSessions = [...existingSessions, sessionData];
      // ローカルストレージにセッションを保存
      localStorage.setItem('bannerSessions', JSON.stringify(updatedSessions));
    } catch (error) {
      alert('保存に失敗しました');
    }
  };

  // ローカルストレージからデータを取得
  const loadSavedSessions = () => {
    try {
      const stored = localStorage.getItem('bannerSessions');
      if (stored) {
        const sessions = JSON.parse(stored);
        setsavedSessions(Array.isArray(sessions) ? sessions : []);
      }
    } catch (error) {
      setsavedSessions([]);
    }
  };

  // データをすべて削除
  const deleteAllSessions = () => {
    try {
      localStorage.removeItem('bannerSessions');
      setsavedSessions([]);
      alert('すべてのデータを削除しました');
    } catch (error) {
      alert('削除に失敗しました');
    }
  }

  // 画面の表示切替
  const changeScreen = (screenName) => {
    if (screenName !== mode) {
      setMode(screenName);
    }

    if (mode === 'input') {
      setCurrentIndex(0);
      setResults([]);
    }

    if (screenName === 'library') {
      loadSavedSessions();
    }
  };

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
    changeScreen('swipe');
  };

  // マウント関係
  useEffect(() => {
    initializeDraggable();
  }, [currentIndex, mode]);

  // スワイプの処理
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

  // スワイプ後の処理
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
      changeScreen('result');
    }
  };

  const previousImage = () => {
    images[currentIndex - 1];
  };

  return (
    <div className='min-h-screen bg-gray-100 overflow-hidden'>
      {/* タイトル画面 */}
      <FadeTransition animationKey={mode}>
        {mode === 'title' && (
          <TitleScreen
            changeInput={() => changeScreen('input')}
            changeLibrary={() => changeScreen('library')}
          />
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
            changeInput={() => changeScreen('input')}
            previousImage={previousImage}
          />
        )}
        {/* 結果画面 */}
        {mode === 'result' && (
          <ResultScreen
            results={results}
            images={images}
            changeInput={() => changeScreen('input')}
            saveToLocalStorage={saveToLocalStorage}
          />
        )}
        {/* ライブラリー */}
        {mode === 'library' && (
          <LibraryScreen 
            changeTitle={() => changeScreen('title')} 
            changeInput={() => changeScreen('input')} 
            savedSessions={savedSessions}
            deleteAllSessions={deleteAllSessions}
          />
        )}
      </FadeTransition>
    </div>
  );
}
