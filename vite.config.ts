import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Viteの設定
 * https://ja.vitejs.dev/config/
 */
export default defineConfig(() => {
  return {
    // ------------------------------
    // 共通オプション
    // ------------------------------
    // プロジェクトのルートディレクトリ（index.htmlの設置場所）
    root: 'src',
    // ベースとなるパブリックパス
    base: '/portfolio/',
    // 使用するプラグイン
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
    ],
    // 静的アセットを格納するディレクトリ
    publicDir: resolve(__dirname, 'public'),
    // 環境変数ファイルを格納するディレクトリ
    envDir: resolve(__dirname),
    // ------------------------------
    // ビルドオプション
    // ------------------------------
    build: {
      // ビルドしたファイルの出力ディレクトリ
      outDir: resolve(__dirname, 'docs'),
      // outDirがルート外にある場合に発する警告を無効化
      emptyOutDir: true,
      // エントリーポイント指定
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src', 'index.html'),
          404: resolve(__dirname, 'src', '404.html'),
        },
      },
    },
  }
})
