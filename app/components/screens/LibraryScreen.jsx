import Button from '../common/Button';
import MoodDisplay from '../common/MoodDisplay';
import TitleText from '../common/TitleText';
import { useState, useEffect, useRef } from 'react';

export default function LibraryScreen({ onNavigate }) {
  const [selectedSession, setSelectedSession] = useState(null); // 選択済みセッションの状態管理
  const [savedSessions, setsavedSessions] = useState([]); // セッション一覧の管理

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
    <div className="flex min-h-screen items-center justify-center p-2">
      <div className="mx-auto my-auto w-full max-w-2xl">
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
            <div className="mt-3">
              <MoodDisplay selectedMoods={selectedSession.selectedMoods} />
            </div>

            {/* 画像表示 */}
            <div className="rounded-lg bg-white p-4">
              <div className="grid grid-cols-4 gap-4">
                {selectedSession.results
                  .filter((result) => result.choice === 'like')
                  .map((result, index) => (
                    <div key={index}>
                      <img
                        src={result.image}
                        alt={`好きな画像 ${index + 1}`}
                        className="w-full object-cover"
                      />
                    </div>
                  ))}
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
                      <MoodDisplay selectedMoods={session.selectedMoods} />
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
      </div>
    </div>
  );
}
