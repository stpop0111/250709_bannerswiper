import Button from '../common/Button';
import { useState, useEffect, useRef } from 'react';

export default function LibraryScreen({
  onNavigate,
}) {
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
  }

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
    <div className='min-h-screen flex items-center justify-center p-2'>
      <div className='w-full max-w-2xl mx-auto my-auto'>
        {/* 詳細表示 */}
        {selectedSession ? (
          <>
            {/* タイトル */}
            <div className='text-center mb-4'>
              <h2 className='text-5xl font-bold text-gray-900 mb-2'>
                {selectedSession.name}
              </h2>
              <p className='text-lg'>
                作成日：
                {new Date(selectedSession.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* 画像表示 */}
            <div className='bg-white rounded-lg p-4'>
              <div className='grid grid-cols-4 gap-4'>
                {selectedSession.results
                  .filter((result) => result.choice === 'like')
                  .map((result, index) => (
                    <div key={index}>
                      <img
                        src={result.image}
                        alt={`好きな画像 ${index + 1}`}
                        className='w-full object-cover'
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* ボタン */}
            <div className='mt-6 w-full mx-auto'>
              <div className=''>
                <Button
                  onClick={backToList}
                  variant='optional'
                  buttonWidth='full'
                >
                  リストに戻る
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* タイトル */}
            <div className='text-center mb-4'>
              <h2 className='text-5xl font-bold text-gray-900 mb-2'>
                選んだバナー
              </h2>
              <p className='text-lg'>あなたの素晴らしいデザインセンスです</p>
            </div>

            {/* 一覧 */}
            <div className='bg-white p-4'>
              {!savedSessions || savedSessions.length === 0 ? (
                <p className='text-center text-gray-500'>
                  まだ保存されたセッションがありません。
                </p>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {savedSessions.map((session) => (
                    <div
                      key={session.id}
                      className='cursor-pointer border rounded-lg p-4'
                      onClick={() => selectSession(session)}
                    >
                      <h3 className='font-bold text-lg mb-2'>{session.name}</h3>
                      <p className='text-sm text-gray-800 mb-2'>
                        作成日：
                        {new Date(session.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ボタン */}
            <div className='mt-6 w-full mx-auto'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-4'>
                <Button onClick={() => onNavigate('input')} variant='primary'>
                  デザインを探索する
                </Button>
                <Button onClick={() => onNavigate('title')} variant='optional'>
                  タイトルに戻る
                </Button>
              </div>
              <Button
                onClick={deleteAllSessions}
                variant='dislike'
                buttonWidth='full'
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
