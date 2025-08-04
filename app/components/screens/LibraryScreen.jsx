import Button from '../common/Button';
import MoodDisplay from '../common/MoodDisplay';
import TitleText from '../common/TitleText';
import ScreenWrapper from '../common/ScreenWrapper';
import { aspectCalc } from '../../utils/aspectCalc';
import { useState, useEffect, useRef } from 'react';

export default function LibraryScreen({ onNavigate, onDeleteMood }) {
  const [selectedSession, setSelectedSession] = useState(null); // 選択済みセッションの状態管理
  const [savedSessions, setsavedSessions] = useState([]); // セッション一覧の管理
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

  // ローカルストレージをロード
  // =======================================
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

  // ローカルストレージの削除
  // =======================================
  const deleteAllSessions = () => {
    try {
      localStorage.removeItem('bannerSessions');
      setsavedSessions([]);
      alert('すべてのデータを削除しました');
    } catch (error) {
      alert('削除に失敗しました');
    }
  };

  // セッションの選択
  const selectSession = (session) => {
    setSelectedSession(session);
  };

  // リストに戻る
  const backToList = () => {
    setSelectedSession(null);
  };

  // 画面表示時にデータを読み込み
  useEffect(() => {
    loadSavedSessions();
  }, []);

  return (
    <ScreenWrapper>
      {/* 詳細表示 */}
      {selectedSession ? (
        <>
          {/* タイトル */}
          <TitleText
            mainText={selectedSession.name}
            subText={`
                作成日：
                ${new Date(selectedSession.createdAt).toLocaleDateString()}`}
          />
          <div className="mb-4 w-full">
            <div className="mx-auto w-fit rounded-lg border border-blue-200 bg-blue-50 p-3">
              <MoodDisplay
                selectedMoods={selectedSession.selectedMoods}
                readOnly={true}
              />
            </div>
          </div>

          {/* 画像表示 */}
          <div className="max-h-[300px] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 bg-white p-4 md:grid-cols-3">
              {selectedSession.results
                .filter((result) => result.choice === 'like')
                .map((result, index) => {
                  // 👆 ここが変更点：オブジェクトから状態を取得
                  const imageState = imageStates[index] || {
                    width: 0,
                    height: 0,
                    size: 'w-full',
                  };

                  return (
                    <div key={index} className="shadow-lg">
                      <div className="flex aspect-square w-full flex-col items-center justify-center p-2">
                        <img
                          src={result.image}
                          alt={`好きな画像 ${index + 1}`}
                          className={`object-cover ${imageState.size}`}
                          onLoad={(e) => handleImageLoad(e, index)}
                          onError={(e) => {
                            e.target.src = '/test01.jpg';
                          }}
                        />
                      </div>
                      <p className="w-full bg-white py-2 text-center text-lg">
                        {imageState.width}×{imageState.height}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* ボタン */}
          <div className="mx-auto mt-6 w-full">
            <div className="">
              <Button
                onClick={backToList}
                variant="optional"
                buttonWidth="full"
              >
                リストに戻る
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* タイトル */}
          <TitleText
            mainText={'選んだバナー'}
            subText={'あなたの素晴らしいデザインセンスです'}
          />

          {/* 一覧 */}
          <div className="bg-white p-4">
            {!savedSessions || savedSessions.length === 0 ? (
              <p className="text-center text-gray-500">
                まだ保存されたセッションがありません。
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {savedSessions.map((session) => (
                  <div
                    key={session.id}
                    className="cursor-pointer rounded-lg border p-4"
                    onClick={() => selectSession(session)}
                  >
                    <h3 className="mb-2 text-lg font-bold">{session.name}</h3>{' '}
                    {/* タイトル */}
                    <p className="mb-2 text-sm text-gray-800">
                      {' '}
                      {/* 作成日 */}
                      作成日：
                      {new Date(session.createdAt).toLocaleDateString()}
                    </p>
                    <MoodDisplay
                      selectedMoods={session.selectedMoods}
                      readOnly={true}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ボタン */}
          <div className="mx-auto mt-6 w-full">
            <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <Button onClick={() => onNavigate('input')} variant="primary">
                デザインを探索する
              </Button>
              <Button onClick={() => onNavigate('title')} variant="optional">
                タイトルに戻る
              </Button>
            </div>
            <Button
              onClick={deleteAllSessions}
              variant="dislike"
              buttonWidth="full"
            >
              すべて削除する
            </Button>
          </div>
        </>
      )}
    </ScreenWrapper>
  );
}
