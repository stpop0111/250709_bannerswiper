// 画像のアスペクト比計算
// =======================================
export const aspectCalc = (e, imageSize) => {
  const img = e.target;
  const aspectRatio = img.naturalWidth / img.naturalHeight;

  // アスペクト比が1を超えている場合
  if (aspectRatio > 1) {
    imageSize('w-full'); // 横長画像
  } else {
    imageSize('h-full'); // 縦長画像
  }
};
