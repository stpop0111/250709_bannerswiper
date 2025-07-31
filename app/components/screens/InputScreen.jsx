import Button from '../common/Button';
import { useState, useEffect, useRef } from 'react';

export default function InputScreen({ onNavigate, onComplete }) {
  const [inputUrls, setInputUrls] = useState(''); //urlの入力

  // 画像URLを記入時
  // =======================================
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

    if (urlArray.length === 0) {
      alert('有効なURLを入力してください');
      return;
    }
    
    onComplete(urlArray);
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-2'>
      <div className='w-full max-w-2xl mx-auto my-auto'>
        {/* タイトル */}
        <div className='text-center mb-4'>
          <h2 className='text-5xl font-bold text-gray-900 mb-2'>
            探求に行きましょう。
          </h2>
          <p>画像URLを入力するか、インポートする形式を選んでください。</p>
        </div>

        {/* 入力エリア */}
        <div className='mb-6 p-4 border bg-white border-gray-300 rounded-lg '>
          <textarea
            value={inputUrls}
            placeholder={`画像URLを入力：
https://example.com/image1.jpg
https://example.com/image2.jpg
https://example.com/image3.jpg
      `}
            className='w-full min-h-[120px] max-h-[400px] resize-none overflow-hidden border-none outline-none'
            onChange={(e) => setInputUrls(e.target.value)}
            onError={(e) => {
              e.target.src = '/test01.jpg';
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />

          {/* ボタン */}
          <div className='flex justify-between items-end w-full'>
            <button className='w-8 h-8 border-1 border-gray-600 rounded-lg'>
              +
            </button>
            <Button onClick={handleUrlSubmit} variant='primary'>
              スワイプ開始！
            </Button>
          </div>
        </div>

        {/* タイトルに戻るボタン */}
        <div className='w-full'>
          <Button onClick={() => onNavigate('title')} variant='optional' buttonWidth='full'>
            タイトルに戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
