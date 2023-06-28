import { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import localforage from 'localforage'

import { useMediaQuery } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { theme } from './common/theme'
import { systemPrompt } from './common/prompt'
import { isStoredMinutes } from './lib/isMinutes'
import { TopBar } from './TopBar'
import { SideBar } from './SideBar'
import { Main } from './Main'
import { Conversation } from './Conversation'
import { Minutes } from './Minutes'

/*================================================
 Component
================================================*/
function App() {
  // 議事録記録用のステート
  const [storedMinutes, setStoredMinutes] = useState<Minutes[]>([])
  // 議事録表示用のステート
  const [currentMinutes, setCurrentMinutes] = useState<Minutes['date'] | null>(null)
  // サイドメニュー開閉用のステート
  const [drawerOpen, setDrawerOpen] = useState(useMediaQuery(theme.breakpoints.up('md')) ? true : false)
  // API設定（OpenAI）
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  })
  delete configuration.baseOptions.headers['User-Agent']
  const openai = new OpenAIApi(configuration)

  // APIリクエスト
  const openaiRequest = async (conversation: string) => {
    await openai
      // リクエスト送信
      .createChatCompletion({
        model: import.meta.env.VITE_OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: conversation,
          },
        ],
      })
      // レスポンス取得
      .then((response) => {
        const response_message = response.data.choices[0].message?.content
        if (response_message) {
          const newMinutes = {
            date: new Date().getTime(),
            title:
              new Date()
                .toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' })
                .replaceAll('/', '') + '_議事録',
            content: response_message,
          }
          setStoredMinutes((storedMinutes) => [newMinutes, ...storedMinutes])
          showMinutes(newMinutes.date)
        }
      })
      // エラーハンドリング
      .catch((error) => {
        console.error(error)
      })
  }

  // 表示用議事録の制御を行う関数
  const showMinutes = (date: Minutes['date'] | null) => {
    setCurrentMinutes(date)
  }

  // 議事録の更新を行う関数
  const updateMinutes = <T extends Minutes['date'], U extends keyof Minutes, V extends Minutes[U]>(
    date: T,
    key: U,
    value: V
  ) => {
    setStoredMinutes((storedMinutes) => {
      const newStoredMinutes = storedMinutes.map((minutes) => {
        if (minutes.date === date) {
          return { ...minutes, [key]: value }
        } else {
          return minutes
        }
      })

      return newStoredMinutes
    })
  }

  // 議事録の削除を行う関数
  const deleteMinutes = (date: Minutes['date']) => {
    setStoredMinutes((storedMinutes) => storedMinutes.filter((minutes) => minutes.date !== date))
    showMinutes(null)
  }

  // サイドメニュー開閉を行う関数
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }
  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  // ブラウザのストレージデータを取得
  useEffect(() => {
    localforage.getItem('storedMinutes').then((values) => isStoredMinutes(values) && setStoredMinutes(values))
  }, [])
  // ステートが更新されたらその値を保存
  useEffect(() => {
    localforage.setItem('storedMinutes', storedMinutes)
  }, [storedMinutes])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TopBar drawerOpen={drawerOpen} onDrawerOpen={handleDrawerOpen} />
        <SideBar
          drawerOpen={drawerOpen}
          onDrawerClose={handleDrawerClose}
          storedMinutes={storedMinutes}
          showMinutes={showMinutes}
        />
        <Main drawerOpen={drawerOpen}>
          <Container maxWidth="md">
            {(() => {
              const minutes = storedMinutes.find((v) => v.date === currentMinutes)
              if (minutes) {
                return <Minutes minutes={minutes} updateMinutes={updateMinutes} deleteMinutes={deleteMinutes} />
              } else {
                return <Conversation openaiRequest={openaiRequest} />
              }
            })()}
          </Container>
        </Main>
      </Box>
    </ThemeProvider>
  )
}

export default App
