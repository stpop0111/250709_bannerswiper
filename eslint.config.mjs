import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      // React関連
      'react/jsx-uses-react': 'off', // React 17+では不要
      'react/react-in-jsx-scope': 'off', // React 17+では不要
      'react/prop-types': 'warn', // PropTypesの警告
      'react/jsx-key': 'error', // key属性の必須化
      'react/jsx-no-duplicate-props': 'error', // 重複props禁止
      'react/jsx-no-undef': 'error', // 未定義変数の禁止
      'react/no-unused-state': 'warn', // 未使用stateの警告

      // JavaScript関連
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ], // 未使用変数の警告（_で始まるものは除外）
      'no-console': 'warn', // console.logの警告
      'prefer-const': 'error', // const推奨
      'no-var': 'error', // var禁止
      eqeqeq: ['error', 'always'], // === 強制

      // Next.js関連
      '@next/next/no-img-element': 'warn', // next/imageの推奨
      '@next/next/no-html-link-for-pages': 'error', // Linkコンポーネント推奨

      // インポート関連
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
        },
      ], // インポート順序の整理

      // コードスタイル
      indent: ['warn', 2], // インデント2スペース
      quotes: ['warn', 'single'], // シングルクォート推奨
      semi: ['warn', 'always'], // セミコロン必須
      'comma-dangle': ['warn', 'always-multiline'], // 末尾カンマ
    },

    // 特定ファイルの設定
    overrides: [
      {
        files: ['**/*.jsx', '**/*.js'],
        env: {
          browser: true,
          es2021: true,
          node: true,
        },
        parserOptions: {
          ecmaVersion: 2021,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    ],
  },
];

export default eslintConfig;
