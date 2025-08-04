import Button from '../common/Button';
import MoodDisplay from '../common/MoodDisplay';
import TitleText from '../common/TitleText';
import { CloseButton } from '../common/Icons';
import ScreenWrapper from '../common/ScreenWrapper';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LibraryScreen({ onNavigate }) {
  const [selectedSession, setSelectedSession] = useState(null); // 選択済みセッションの状態管理
  const [deleteSession, setDeleteSession] = useState(null); // 選択したセッションの削除
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

  // モーダル表示
  // =======================================
  const elRef = useRef(null);
  useEffect(() => {
    const element = elRef.current;

    if (deleteSession) {
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
  }, [deleteSession]);

  // モダールウィンドウ表示
  const openModal = (e,deleteSession) => {
    e.stopPropagation();
    setDeleteSession(deleteSession);
  };
  // モダールウィンドウ非表示
  const closeModal = () => {
    setDeleteSession(null)
  };

  // 削除関数
  const handleDelete = () => {
    try {
      const updatedSessions = savedSessions.filter(
        session => session.id !== deleteSession.id
      );
      localStorage.setItem('bannerSessions', JSON.stringify(updatedSessions));
      closeModal();
      setsavedSessions(updatedSessions)
    } catch (error) {
      alert('削除できませんでした');
    }
  }

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
      {/* モーダルウィンドウの表示 */}
      {deleteSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 背景 */}
          <div
            className="absolute inset-0 h-full w-screen bg-black opacity-50"
            onClick={closeModal}
          ></div>

          {/* モーダル */}
          <div
            className="relative z-10 mx-4 w-full max-w-md rounded-lg bg-white p-5"
            ref={elRef}
          >
            <div className="mb-4 rounded-lg border p-2">
              <h3 className="text-lg font-bold">セッションを削除しますか？</h3>
              <p>セッション名：{deleteSession.name}</p>
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
                onClick={handleDelete}
                variant="dislike"
                animation={false}
                buttonWidth="full"
              >
                削除
              </Button>
            </div>
          </div>
        </div>
      )}
      
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
                    className="relative cursor-pointer rounded-lg border p-4"
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
                    <div className="absolute -top-3 -left-3">
                      <CloseButton onClick={(e) => openModal(e,session)} />
                    </div>
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
