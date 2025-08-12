// 画像のURLが有効か確認
// =======================================
const checkImage = (url) => {
  return new Promise((resolve) => {
    // Promiseで非同期処理
    const img = new Image();

    img.onload = () => {
      resolve({ url, isValid: true });
    };

    img.onerror = () => {
      resolve({ url, isValid: false });
    };

    img.src = url;
  });
};

// 画像のURLが有効か確認
// =======================================
export const validateImages = async (urlArray, onProgress) => {
  const results = [];

  for (let i = 0; i < urlArray.length; i++) {
    const result = await checkImage(urlArray[i]);
    results.push(result);

    if (onProgress) {
      onProgress(i + 1, urlArray.length); // (current, total)として"InputScreen"に渡される
    }
  }

  return results;
};

// 有効な画像URLの取得
export const getValidImages = (results) => {
  return results.filter((result) => result.isValid).map((result) => result.url);
};

// 無効な画像URLの取得
export const getInvalidImages = (results) => {
  return results
    .filter((result) => !result.isValid)
    .map((result) => result.url);
};
