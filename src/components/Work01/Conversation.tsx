import { useCallback, useState } from 'react'
import 'regenerator-runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { css } from '@emotion/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MicIcon from '@mui/icons-material/Mic'
import PauseIcon from '@mui/icons-material/Pause'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

import { Loader } from './Loader'

/*================================================
 Definitions
================================================*/
type Props = {
  openaiRequest: (conversation: string) => void
}

/*================================================
 Component
================================================*/
export const Conversation = (props: Props) => {
  // APIに送信する会議内容の状態管理用ステート
  const [conversation, setConversation] = useState('')
  // ローディング表示用のステート
  const [loading, setLoading] = useState(false)

  // 音声入力用
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable } =
    useSpeechRecognition()
  // 音声入力開始時の処理
  const onStart = async () => {
    await SpeechRecognition.startListening({ continuous: true })
  }
  // 音声入力終了時の処理
  const onEnd = async () => {
    await SpeechRecognition.stopListening()
    setConversation(conversation + transcript)
    resetTranscript()
  }

  // フォーム送信時の処理
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      // APIリクエスト中はスルー
      if (loading) {
        return
      }
      // フォームが空のとき
      if (!conversation) {
        alert('会議内容を入力してください。')
        return
      }

      // ローディング表示を開始
      setLoading(true)
      // APIリクエスト
      await props.openaiRequest(conversation)
      // ローディング表示を終了
      setLoading(false)

      // 入力消去（フォームクリア)
      setConversation('')
    },
    [conversation, loading]
  )

  return (
    <Box>
      <Box css={styles.speechRecognition}>
        {!listening && (
          <Button type="button" variant="outlined" color="primary" size="large" className="start-btn" onClick={onStart}>
            <MicIcon fontSize="large" />
            <Typography component="span">会議を開始</Typography>
          </Button>
        )}
        {listening && (
          <Button type="button" variant="outlined" color="secondary" size="large" className="end-btn" onClick={onEnd}>
            <PauseIcon fontSize="large" />
            <Typography component="span">会議を終了</Typography>
          </Button>
        )}
        {!browserSupportsSpeechRecognition && <Typography>※ブラウザが音声認識未対応です。</Typography>}
        {!isMicrophoneAvailable && <Typography>※マイクへのアクセスが拒否されています。</Typography>}
        {transcript && <Typography>{transcript}</Typography>}
      </Box>
      <Box component="form" css={styles.fromContainer} onSubmit={handleSubmit}>
        <TextField
          label="会議内容"
          variant="filled"
          multiline
          rows={10}
          className="conversation-text"
          value={conversation}
          onChange={(e) => setConversation(e.target.value)}
        />
        <Box className="submit-btn">
          <Button type="submit" variant="contained" startIcon={<NoteAddIcon fontSize="large" />}>
            議事録を作成
          </Button>
        </Box>
      </Box>
      <Loader open={loading} />
    </Box>
  )
}

/*================================================
 Styling
================================================*/
const styles = {
  speechRecognition: css`
    button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;
      width: 100%;
      max-width: 250px;
      aspect-ratio: 1;
      margin: 2em auto;
      border-radius: 50%;
    }
  `,

  fromContainer: css`
    .conversation-text {
      width: 100%;
    }

    .submit-btn {
      margin: 2em;
      text-align: center;

      & button {
        width: 100%;
        max-width: 300px;
        padding: 1em;
      }
    }
  `,
}
