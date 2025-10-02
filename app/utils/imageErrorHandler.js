// app/utils/imageErrorHandler.js

// エラー情報を記録する
// =======================================
export const recordImageError = (url) => {
  const errors = JSON.parse(localStorage.getItem('imageErrors') || '[]');

  if (!errors.include(url)) {
    errors.push(url);
    localStorage.setItem('imageErrors', JSON.stringify(errors));
  }
};

// エラーログを取得する
// =======================================
export const getImageErrors = () => {
  return JSON.parse(localStorage.getItem('imageErrors') || '[]');
};

// エラーログをクリアする
// =======================================
export const clearImageErrors = () => {
  localStorage.removeItem('imageErrors');
};

// エラー数を取得する
// =======================================
export const getImageErrorCount = () => {
  const errors = getImageErrors();
  return errors.length;
};

// デフォルトのエラー画像URLを返す
// =======================================
export const getErrorImageUrl = () => {
  return '/test01.jpg';
};
