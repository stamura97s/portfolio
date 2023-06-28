import { useEffect, useState } from 'react'

import { css } from '@emotion/react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles'

import { Wave } from './Wave'

/*================================================
 Variables
================================================*/
const customTheme = (outerTheme: Theme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&:before, &:after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  })

/*================================================
 Component
================================================*/
export const Contact = () => {
  const outerTheme = useTheme()

  // フォームデータ用ステート
  const [nameText, setNameText] = useState('')
  const [emailText, setEmailText] = useState('')
  const [msgText, setMsgText] = useState('')
  // フォームボタンの状態管理用ステート
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState(true)
  // アラート表示用のステート
  const [successAlert, setSuccessAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)

  const submitForm = async () => {
    const formId = '1FAIpQLScYDBOUfMIZRCIHHwevsZKDVdUoRXxhINfRjaC_NfsSV0o98A'
    const formUrl = `https://docs.google.com/forms/u/0/d/e/${formId}/formResponse`

    const formData = new FormData()
    formData.append('entry.2005620554', nameText)
    formData.append('entry.1045781291', emailText)
    formData.append('entry.839337160', msgText)

    // リクエスト送信
    await fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    })
      // レスポンス取得
      .then(() => {
        setSuccessAlert(true)
      })
      // エラーハンドリング
      .catch(() => {
        setErrorAlert(true)
      })
  }

  useEffect(() => {
    // フォームボタンの状態制御
    if (!successAlert && !errorAlert && nameText && emailText && msgText) {
      setSubmitBtnDisabled(false)
    } else {
      setSubmitBtnDisabled(true)
    }
  }, [successAlert, errorAlert, nameText, emailText, msgText])

  return (
    <section id="contact" css={styles.section}>
      <Wave />
      <div className="wrapper">
        <h2>Contact</h2>
        <p css={styles.thanks}>
          お忙しい中、ポートフォリオをご覧いただきありがとうございました！
          <br />
          少しでもご興味を持っていただけましたら、是非よろしくお願いいたします！
        </p>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault()
            submitForm()
          }}
          method="post"
          noValidate
          autoComplete="off"
          css={styles.form}
        >
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              required
              fullWidth
              label="名前"
              id="name-input"
              variant="filled"
              css={styles.formItem}
              value={nameText}
              onChange={(e) => setNameText(e.target.value)}
            />
            <TextField
              required
              fullWidth
              label="メールアドレス"
              id="email-input"
              variant="filled"
              css={styles.formItem}
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
            />
            <TextField
              required
              fullWidth
              multiline
              rows={4}
              label="メッセージ"
              id="msg-input"
              variant="filled"
              css={styles.formItem}
              value={msgText}
              onChange={(e) => setMsgText(e.target.value)}
            />
            {successAlert && (
              <Alert severity="success" css={styles.alert}>
                お問い合わせを受け付けました。
              </Alert>
            )}
            {errorAlert && (
              <Alert severity="error" css={styles.alert}>
                お問い合わせに失敗しました。
              </Alert>
            )}
            <div css={styles.formItem}>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                size="large"
                disabled={submitBtnDisabled}
              >
                送信
              </Button>
            </div>
          </ThemeProvider>
        </Box>
      </div>
    </section>
  )
}

/*================================================
 Styling
================================================*/
const styles = {
  section: css`
    // background-color: rgba(0, 168, 235, 0.5);
  `,
  thanks: css`
    text-align: center;
  `,
  form: css`
    max-width: 768px;
    margin: 4em auto;
  `,
  formItem: css`
    margin: 2em auto;
    text-align: center;
  `,
  alert: css`
    justify-content: center;
    align-items: center;
    max-width: 600px;
    margin: auto;
  `,
}
