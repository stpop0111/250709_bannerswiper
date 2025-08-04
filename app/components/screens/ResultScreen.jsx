'use client';

import Button from '../common/Button';
import MoodDisplay from '../common/MoodDisplay';
import { aspectCalc } from '../../utils/aspectCalc';
import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';

export default function ResultScreen({
  results,
  images,
  onNavigate,
  selectedMoods,
}) {
  const [saveSession, setSaveSession] = useState(false); // 保存ダイアログ
  const [sessionName, setSessionName] = useState(''); // セッション名の保存
  const [imageSize, setImageSize] = useState('w-full');
  const elRef = useRef(null);

  // 画像のアスペクト比計算(外部JS連携)
  // =======================================
  const handleImageLoad = (e) => {
    aspectCalc(e, setImageSize);
  };

  // モーダル表示
  // =======================================
  useEffect(() => {
    const element = elRef.current;

    if (saveSession) {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power4.out',
        }
      );
    }

    return () => {
      gsap.killTweensOf(element);
    };
  }, [saveSession]);

  // モダールウィンドウ表示
  const openModal = () => {
    const defaultName = createDefaultName();
    setSessionName(defaultName);
    setSaveSession(true);
  };
  // モダールウィンドウ非表示
  const closeModal = () => {
    setSaveSession(false);
  };

  // セッションの保存
  // =======================================
  // 初期の名前（保存日）
  const createDefaultName = () => {
    const now = new Date();
    const year = String(now.getFullYear()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    const currentDate = `${year}-${month}-${day}-${hour}-${min}`;
    return currentDate;
  };

  // ローカルストレージへの保存
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

  // セッションの保存ハンドリング
  const handleSave = () => {
    // セッション名を確認
    if (!sessionName.trim()) {
      alert('セッション名が未記入です');
      return;
    }

    // 保存するデータを作成
    const sessionData = {
      id: Date.now().toString(),
      name: sessionName,
      createdAt: new Date().toISOString(),
      images: images,
      results: results,
      selectedMoods: selectedMoods,
    };

    saveToLocalStorage(sessionData); // ローカルストレージに保存
    closeModal(); // モーダルウィンドウを閉じる
    alert('保存しました');
    onNavigate('title');
  };

  if (results.filter((result) => result.choice === 'like').length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center p-2'>
        <div className='w-full max-w-2xl mx-auto my-auto'>
          {/* タイトル */}
          <div className='text-center mb-4'>
            <h2 className='text-5xl font-bold text-gray-900 mb-2'>
              選んだバナーがありません
            </h2>
            <p className='text-lg'>あれ？全部イマイチだったかな？</p>
          </div>

          {/* ボタン */}
          <div className='max-w-2xl m-auto mt-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
              <Button onClick={() => onNavigate('input')} variant='primary'>
                入力に戻る
              </Button>
              <Button onClick={() => onNavigate('library')} variant='optional'>
                ライブラリーを見る
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-2'>
      <div className='w-full max-w-5xl mx-auto my-auto'>
        {/* モーダルウィンドウの表示 */}
        {saveSession && (
          <div className='fixed inset-0 z-50 flex justify-center items-center'>
            {/* 背景 */}
            <div
              className='absolute inset-0 w-screen h-full bg-black opacity-50'
              onClick={closeModal}
            ></div>

            {/* モーダル */}
            <div
              className='bg-white rounded-lg p-5 w-full max-w-md mx-4 relative z-10'
              ref={elRef}
            >
              <div className='border rounded-lg p-2 mb-4'>
                <h3 className='text-lg font-bold '>セッション名を保存</h3>
                {/* 名前入力欄 */}
                <input
                  type='text'
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  className='w-full p-2 resize-none overflow-hidden border-none outline-none'
                  placeholder='あなたの素敵なアイディアを保存しよう'
                />
              </div>

              {/* ボタン */}
              <div className='flex gap-2'>
                <Button
                  onClick={closeModal}
                  variant='optional'
                  animation={false}
                  buttonWidth='full'
                >
                  キャンセル
                </Button>
                <Button
                  onClick={handleSave}
                  variant='primary'
                  animation={false}
                  buttonWidth='full'
                >
                  保存
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* タイトル */}
        <div className='text-center mb-4'>
          <h2 className='text-5xl font-bold text-gray-900 mb-2'>
            選んだバナー
          </h2>
          <p className='text-lg'>あなたの素晴らしいデザインセンスです</p>
        </div>
        {/* 雰囲気表示 */}
        <div className="mb-3">
          <MoodDisplay selectedMoods={selectedMoods} />
        </div>
        {/* 画像表示 */}
        <div className='max-h-[300px] overflow-y-auto'>
          <div className='grid grid-cols-2 p-2 gap-2 md:grid-cols-4'>
            {results
              .filter((result) => result.choice === 'like')
              .map((result, index) => (
                <div
                  key={index}
                  className='p-4 bg-slate-200 w-full aspect-square flex justify-center items-center'
                >
                  <img
                    src={result.image}
                    alt={`好きな画像 ${index + 1}`}
                    className={`object-cover shadow-lg ${imageSize}`}
                    onLoad={handleImageLoad}
                    onError={(e) => {
                      e.target.src = '/test01.jpg';
                    }}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* ボタン */}
        <div className='max-w-2xl m-auto mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            <Button onClick={openModal} variant='primary'>
              保存する
            </Button>
            <Button onClick={() => onNavigate('input')} variant='optional'>
              入力に戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
