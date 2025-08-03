// 雰囲気選択の選択肢データ
// 後から追加・編集可能

export const moodOptions = {
  // カテゴリー
  category: [
    { id: 'tech', label: 'IT・テック' },
    { id: 'fashion', label: 'ファッション' },
    { id: 'food', label: '食品・グルメ' },
    { id: 'beauty', label: '美容・コスメ' },
    { id: 'lifestyle', label: '生活・雑貨' },
    { id: 'entertainment', label: 'エンタメ' },
  ],

  // テイスト
  taste: [
    { id: 'luxury', label: '高級感・上品' },
    { id: 'casual', label: 'カジュアル・親しみやすい' },
    { id: 'natural', label: 'ナチュラル・爽やか' },
    { id: 'pop', label: 'ポップ・元気' },
    { id: 'simple', label: 'シンプル・ミニマル' },
    { id: 'retro', label: 'レトロ・ヴィンテージ' },
  ],

  // カラー
  color: [
    { id: 'colorful', label: 'カラフル' },
    { id: 'monotone', label: 'モノトーン' },
    { id: 'pastel', label: 'パステル' },
    { id: 'vivid', label: 'ビビッド' },
    { id: 'earth', label: 'アース系' },
    { id: 'dark', label: 'ダーク系' },
  ],
};

// 軸の名前
export const axisLabels = {
  category: 'カテゴリー',
  taste: 'テイスト',
  color: 'カラー',
};
