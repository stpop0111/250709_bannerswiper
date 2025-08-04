export default function LoadingScreen({ progress, currentCount, totalCount }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-2">
      <div className="mx-auto my-auto w-full max-w-2xl">
        {/* タイトル */}
        <div className="mb-4 text-center">
          <h2 className="mb-2 text-5xl font-bold text-gray-900">ロード中...</h2>
          <p className="text-lg">
            {currentCount}/{totalCount}
          </p>
        </div>

        {/* 進捗バー */}
        <div className="mb-6 h-4 w-full rounded-full bg-gray-200">
          <div
            className="h-4 rounded-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* パーセンテージ表示 */}
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">{progress}%</p>
        </div>
      </div>
    </div>
  );
}
