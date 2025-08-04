'use client';

import Button from '../common/Button';
import MoodDisplay from '../common/MoodDisplay';
import TitleText from '../common/TitleText';
import ScreenWrapper from '../common/ScreenWrapper';
import gsap from 'gsap';
import { useState, useEffect, useRef } from 'react';

export default function ResultScreen({
  results,
  images,
  onNavigate,
  selectedMoods,
  onDeleteMood,
}) {
  const [saveSession, setSaveSession] = useState(false); // 保存ダイアログ
  const [sessionName, setSessionName] = useState(''); // セッション名の保存
  const [imageStates, setImageStates] = useState({});

  // 画像読み込み時の処理
  // =======================================
  const handleImageLoad = (e, index) => {
    const width = e.target.naturalWidth;
    const height = e.target.naturalHeight;
    let size = 'w-full';

    // aspectCalc関数を使わず、直接計算
    if (width / height > 1) {
      size = 'w-full'; // 横長
    } else {
      size = 'h-full'; // 縦長
    }

    // この画像の状態を更新
    setImageStates((prev) => ({
      ...prev,
      [index]: { width, height, size },
    }));
  };

  // モーダル表示
  // =======================================
  const elRef = useRef(null);
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
    const year = String(now.getFullYear()).slice(-2); // 下2桁を取得
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    const currentDate = `${year}${month}${day}-${hour}${min}`;
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
      <ScreenWrapper>
        {/* タイトル */}
        <TitleText
          mainText={'選んだバナーがありません'}
          subText={'あれ？全部イマイチだったかな？'}
        />
        {/* ボタン */}
        <div className="m-auto mt-6 max-w-2xl">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button onClick={() => onNavigate('input')} variant="primary">
              入力に戻る
            </Button>
            <Button onClick={() => onNavigate('library')} variant="optional">
              ライブラリーを見る
            </Button>
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  return (
    <div className="relative">
      {/* モーダルウィンドウの表示 */}
      {saveSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 背景 */}
          <div
            className="absolute inset-0 h-full w-screen bg-black opacity-50"
            onClick={closeModal}
          ></div>

          {/* モーダル */}
          <div
            className="relative z-10 mx-4 w-full max-w-xl rounded-lg bg-white p-5"
            ref={elRef}
          >
            <div className="mb-4 rounded-lg border p-2">
              <h3 className="text-lg font-bold">セッション名を保存</h3>
              {/* 名前入力欄 */}
              <input
                type="text"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                className="w-full resize-none overflow-hidden border-none p-2 outline-none"
                placeholder="あなたの素敵なアイディアを保存しよう"
              />
              <div className="rounded-sm border-1 bg-slate-50 p-2">
                <h3 className="mb-2 text-sm font-bold">
                  このセッションの雰囲気
                </h3>
                <MoodDisplay
                  selectedMoods={selectedMoods}
                  onDeleteMoodType={onDeleteMood}
                />
              </div>
            </div>

            {/* ボタン */}
            <div className="flex gap-2">
              <Button
                onClick={closeModal}
                variant="optional"
                animation={false}
                buttonWidth="full"
              >
                キャンセル
              </Button>
              <Button
                onClick={handleSave}
                variant="primary"
                animation={false}
                buttonWidth="full"
              >
                保存
              </Button>
            </div>
          </div>
        </div>
      )}

      <ScreenWrapper>
        {/* タイトル */}
        <TitleText
          mainText={'選んだバナー'}
          subText={'あなたの素晴らしいデザインセンスです'}
        />
        {/* 雰囲気表示 */}
        <div className="mb-6">
          <div className="mx-auto w-fit">
            <MoodDisplay
              selectedMoods={selectedMoods}
              onDeleteMoodType={onDeleteMood}
            />
          </div>
        </div>

        {/* 画像表示 */}
        <div className="mb-6 max-h-[600px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {results
              .filter((result) => result.choice === 'like')
              .map((result, index) => {
                const imageState = imageStates[index] || {
                  width: 0,
                  height: 0,
                  size: 'w-full',
                };

                return (
                  <div key={index} className="bg-white p-2">
                    <div className="flex aspect-square flex-col items-center justify-center p-1">
                      <img
                        src={result.image}
                        alt={`好きな画像 ${index + 1}`}
                        className={`object-cover ${imageState.size} shadow-sm`}
                        onLoad={(e) => handleImageLoad(e, index)}
                        onError={(e) => {
                          e.target.src = '/test01.jpg';
                        }}
                      />
                    </div>
                    <div className="w-full border-t-1 border-t-slate-200 bg-white py-2 text-center">
                      <p className="text-lg">
                        {imageState.width}×{imageState.height}
                        <p className="text-sm">
                          (縦横比：
                          {imageState.width / imageState.height === 1 ? (
                            <span className="text-green-500">正方形</span>
                          ) : imageState.width / imageState.height > 1 ? (
                            <span>
                              <span className="text-blue-500">横</span>型
                            </span>
                          ) : (
                            <span>
                              <span className="text-red-500">縦</span>型
                            </span>
                          )}
                          )
                        </p>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* ボタン */}
        <div className="w-full">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Button onClick={openModal} variant="primary">
              保存する
            </Button>
            <Button onClick={() => onNavigate('input')} variant="optional">
              入力に戻る
            </Button>
          </div>
        </div>
      </ScreenWrapper>
    </div>
  );
}
