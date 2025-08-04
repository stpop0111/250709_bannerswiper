import { useState, useEffect, useRef } from 'react';
import LoadingScreen from './LoadingScreen';
import TitleText from '../common/TitleText';
import Button from '../common/Button';
import ScreenWrapper from '../common/ScreenWrapper';
import { validateImages, getValidImages } from '../../utils/imageValidar';
import { moodOptions, axisLabels } from '../../data/options';

export default function InputScreen({ onNavigate, onComplete }) {
  const [inputUrls, setInputUrls] = useState(''); //urlの入力
  const [isLoading, setIsLoading] = useState(false); // ローディングの状態管理
  const [loadingProgress, setLoadingProgress] = useState(0); // ロード進行状態
  const [currentCount, setCurrentCount] = useState(0); // 現在のロード枚数カウント
  const [totalCount, setTotalCount] = useState(0); // 合計の枚数カウント
  const [selectMood, setSelectMood] = useState({
    // 雰囲気選択の状態管理
    category: '',
    taste: '',
    color: '',
  });

  // 雰囲気選択の処理
  // =======================================
  const handleSelectMood = (axis, value) => {
    setSelectMood((prev) => ({
      ...prev,
      [axis]: value,
    }));
  };

  // 画像URLを記入時
  // =======================================
  const handleUrlSubmit = async () => {
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

    // ロード画面への遷移
    setIsLoading(true);
    setTotalCount(urlArray.length);
    setCurrentCount(0);
    setLoadingProgress(0);

    try {
      const results = await validateImages(urlArray, (current, total) => {
        setCurrentCount(current);
        setTotalCount(total);
        const progress = Math.round((current / total) * 100);
        setLoadingProgress(progress);
      });
      const validImages = getValidImages(results);

      if (validImages.length === 0) {
        alert('有効な画像がありませんでした');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      onComplete(validImages, selectMood);
    } catch (error) {
      alert('ロード中にエラーが発生しました');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <LoadingScreen
        progress={loadingProgress}
        currentCount={currentCount}
        totalCount={totalCount}
      />
    );
  }

  return (
    <ScreenWrapper>
        {/* タイトル */}
        <TitleText mainText={'デザインを探索'} />

        {/* 雰囲気選択 */}
        <div className="mb-4">
          <div className="rounded-lg border border-gray-400 bg-white p-4">
            <h3 className="mb-4 text-lg font-bold">雰囲気を選択してください</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                {/* カテゴリー */}
                <label className="mb-2 block text-sm font-semibold">
                  {axisLabels.category}
                </label>
                <select
                  value={selectMood.category}
                  onChange={(e) => handleSelectMood('category', e.target.value)}
                  className="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {moodOptions.category.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {/* テイスト */}
                <label className="mb-2 block text-sm font-semibold">
                  {axisLabels.taste}
                </label>
                <select
                  value={selectMood.taste}
                  onChange={(e) => handleSelectMood('taste', e.target.value)}
                  className="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {moodOptions.taste.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {/* 色 */}
                <label className="mb-2 block text-sm font-semibold">
                  {axisLabels.color}
                </label>
                <select
                  value={selectMood.color}
                  onChange={(e) => handleSelectMood('color', e.target.value)}
                  className="w-full rounded border border-gray-300 p-2 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="">選択してください</option>
                  {moodOptions.color.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 入力エリア */}
        <div className="mb-6 rounded-lg border border-gray-300 bg-white p-4">
          <textarea
            value={inputUrls}
            placeholder={`画像URLを入力：
https://example.com/image1.jpg
https://example.com/image2.jpg
https://example.com/image3.jpg
      `}
            className="max-h-[400px] min-h-[120px] w-full resize-none overflow-hidden border-none outline-none"
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
          <div className="flex w-full items-end justify-between">
            <button className="h-8 w-8 rounded-lg border-1 border-gray-600">
              +
            </button>
            <Button onClick={handleUrlSubmit} variant="primary">
              スワイプ開始！
            </Button>
          </div>
        </div>

        {/* タイトルに戻るボタン */}
        <div className="w-full">
          <Button
            onClick={() => onNavigate('title')}
            variant="optional"
            buttonWidth="full"
          >
            タイトルに戻る
          </Button>
        </div>
    </ScreenWrapper>
  );
}
