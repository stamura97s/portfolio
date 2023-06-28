import { useEffect, useState } from 'react'
import localforage from 'localforage'

import GlobalStyles from '@mui/material/GlobalStyles'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { indigo, pink } from '@mui/material/colors'

import { isTodos } from './lib/isTodos'

import { ActionButton } from './ActionButton'
import { AlertDialog } from './AlertDialog'
import { ButtonAppBar } from './ButtonAppBar'
import { FormDialog } from './FormDialog'
import { QR } from './QR'
import { SideBar } from './SideBar'
import { TodoItem } from './TodoItem'

// テーマを作成
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
})

function App() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  // textステートを更新する関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  // todosステートを更新する関数
  const handleSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) {
      setDialogOpen((dialogOpen) => !dialogOpen)
      return
    }

    // 新しいTodoを作成
    // ※明示的に型注釈を付けてオブジェクトの型を限定
    const newTodo: Todo = {
      // textステートの値をvalueプロパティへ
      value: text,
      // todosステート配列をリストとして展開するために必要となる識別子
      id: new Date().getTime(),
      // タスクの完了/未完了を示すフラグ
      checked: false,
      // タスクの削除/未削除を示すフラグ
      removed: false,
    }

    /**
     * 更新前のtodosステートを元に
     * スプレッド構文で展開した要素へ
     * newTodoを加えた新しい配列でステートを更新
     **/
    setTodos((todos) => [newTodo, ...todos])
    // フォームへの入力をクリアする
    setText('')
    // ダイアログを閉じる
    setDialogOpen((dialogOpen) => !dialogOpen)
  }

  // filterステートを更新する関数
  const handleSort = (filter: Filter) => {
    setFilter(filter)
  }

  // 「ゴミ箱を空にする」関数
  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed))
  }

  // ジェネリクスを使ったリファクタリング
  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(id: number, key: K, value: V) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value }
        } else {
          return todo
        }
      })

      return newTodos
    })
  }

  // ドロワーのステートを反転する関数
  const handleToggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen)
  }

  // QRの表示ステートを反転する関数
  const handleToggleQR = () => {
    setQrOpen((qrOpen) => !qrOpen)
  }

  // ダイアログのステートを反転する関数
  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen)
    // フォームへの入力をクリア
    setText('')
  }

  // アラートのステートを反転する関数
  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen)
  }

  // ブラウザのストレージデータを取得
  useEffect(() => {
    localforage.getItem('todos').then((values) => isTodos(values) && setTodos(values))
  }, [])

  // todosステートが更新されたらその値を保存
  useEffect(() => {
    localforage.setItem('todos', todos)
  }, [todos])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />
      <ButtonAppBar filter={filter} onToggleDrawer={handleToggleDrawer} />
      <SideBar
        drawerOpen={drawerOpen}
        onToggleQR={handleToggleQR}
        onToggleDrawer={handleToggleDrawer}
        onSort={handleSort}
      />
      <QR open={qrOpen} onClose={handleToggleQR} />
      <FormDialog
        text={text}
        dialogOpen={dialogOpen}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleDialog={handleToggleDialog}
      />
      <AlertDialog alertOpen={alertOpen} onEmpty={handleEmpty} onToggleAlert={handleToggleAlert} />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <ActionButton
        todos={todos}
        filter={filter}
        alertOpen={alertOpen}
        dialogOpen={dialogOpen}
        onToggleAlert={handleToggleAlert}
        onToggleDialog={handleToggleDialog}
      />
    </ThemeProvider>
  )
}

export default App
