'use client';

import { useState, useEffect, useRef } from 'react';

import FadeTransition from './components/animations/FadeTransition';

import InputScreen from './components/screens/InputScreen';
import SwipeScreen from './components/screens/SwipeScreen';
import ResultScreen from './components/screens/ResultScreen';
import TitleScreen from './components/screens/TitleScreen';
import LibraryScreen from './components/screens/LibraryScreen';

export default function Home() {
  const [mode, setMode] = useState('title'); //画面モードの状態管理
  const [images, setImages] = useState([]); // 画像の配列
  const [results, setResults] = useState([]); // スワイプ結果

  // 画面の表示切替
  // =======================================
  const changeScreen = (screenName) => {
    // スクリーンの変更
    setMode(screenName);

    // 記入画面に切り替え時 -> スワイプの結果を削除
    if (mode === 'input') {
      setResults([]);
    }
  };

  // SwipeScreen.jsx -> 完了時の処理
  // =======================================
  const handleSwipeComplete = (swipeResults) => {
    setResults(swipeResults);
    changeScreen('result');
  }

  // InputScreen.jsx -> URLの記入完了時
  // =======================================
  const handleInputComplete = (inputUrls) => {
    setImages(inputUrls);
    setResults([]);
    changeScreen('swipe');
  }

  return (
    <div className='min-h-screen bg-gray-100 overflow-hidden'>
      {/* タイトル画面 */}
      <FadeTransition animationKey={mode}>
        {mode === 'title' && (
          <TitleScreen
            onNavigate={changeScreen}
          />
        )}
        {/* URL入力画面 */}
        {mode === 'input' && (
          <InputScreen
            onComplete={handleInputComplete}
            onNavigate={changeScreen}
          
          />
        )}
        {/* スワイプモード */}
        {mode === 'swipe' && (
          <SwipeScreen
            images={images}
            onComplete={handleSwipeComplete}
            onNavigate={changeScreen}
          />
        )}
        {/* 結果画面 */}
        {mode === 'result' && (
          <ResultScreen
            results={results}
            images={images}
            onNavigate={changeScreen}
          />
        )}
        {/* ライブラリー */}
        {mode === 'library' && (
          <LibraryScreen
            onNavigate={changeScreen}
          />
        )}
      </FadeTransition>
    </div>
  );
}
