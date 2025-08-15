// 画像のURLが有効か確認
// =======================================
export const validateImages = async (urlArray, onProgress) => {
  // 内部関数として checkImage を定義
  const checkImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => { resolve({ url, isValid: true })}; // ロードが成功したときの処理
      img.onerror = () => { resolve({ url, isValid: false })}; // ロードが失敗したときの処理
      img.src = url;
    });
  };
  
  // 
  const results = [];
  for (let i = 0; i < urlArray.length; i++) {
    const result = await checkImage(urlArray[i]);
    results.push(result);

    if (onProgress) {
      onProgress(i + 1, urlArray.length);
    }
  }

  return results;
};

// 有効な画像URLの取得
// =======================================
export const getValidImages = (results) => {
  return results.filter((result) => result.isValid).map((result) => result.url);
};

// 無効な画像URLの取得
// =======================================
export const getInvalidImages = (results) => {
  return results
    .filter((result) => !result.isValid)
    .map((result) => result.url);
};
