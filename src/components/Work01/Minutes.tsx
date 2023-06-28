import { useState } from 'react'

import { css } from '@emotion/react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'

/*================================================
 Definitions
================================================*/
type Props = {
  minutes: Minutes
  updateMinutes: <T extends Minutes['date'], U extends keyof Minutes, V extends Minutes[U]>(
    id: T,
    key: U,
    value: V
  ) => void
  deleteMinutes: (id: Minutes['date']) => void
}

/*================================================
 Component
================================================*/
// eslint-disable-next-line react/display-name
export const Minutes = (props: Props) => {
  // コピー関連処理
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true)
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }
  const copyMinutes = () => {
    navigator.clipboard.writeText(props.minutes.content)
    handleSnackbarOpen()
  }

  // 編集関連処理
  const [newTitle, setNewTitle] = useState(props.minutes.title)
  const [newContent, setNewContent] = useState(props.minutes.content)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const handleEditDialogOpen = () => {
    setEditDialogOpen(true)
  }
  const handleEditDialogClose = () => {
    setEditDialogOpen(false)
  }
  const updateMinutes = () => {
    props.updateMinutes(props.minutes.date, 'title', newTitle)
    props.updateMinutes(props.minutes.date, 'content', newContent)
    handleEditDialogClose()
  }

  // 削除関連処理
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true)
  }
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
  }
  const deleteMinutes = () => {
    props.deleteMinutes(props.minutes.date)
    handleDeleteDialogClose()
  }

  return (
    <Box>
      <Box css={styles.titleContainer}>
        <Typography variant="h5" component="h2">
          {props.minutes.title}
        </Typography>
        <ButtonGroup variant="outlined" aria-label="tool">
          <IconButton aria-label="copy" onClick={copyMinutes}>
            <ContentCopyIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={handleEditDialogOpen}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteDialogOpen}>
            <DeleteIcon />
          </IconButton>
        </ButtonGroup>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          autoHideDuration={5000}
          message="コピーしました。"
        />
        <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth="lg" fullWidth>
          <DialogTitle>議事録を編集</DialogTitle>
          <DialogContent>
            <TextField
              label="タイトル"
              variant="standard"
              fullWidth
              margin="normal"
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <TextField
              label="議事録"
              variant="standard"
              fullWidth
              multiline
              rows={10}
              margin="normal"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleEditDialogClose}>
              キャンセル
            </Button>
            <Button color="secondary" onClick={updateMinutes}>
              更新
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
          <DialogTitle>アラート</DialogTitle>
          <DialogContent>
            <DialogContentText>「{props.minutes.title}」を削除しますか？</DialogContentText>
            <DialogContentText>この操作は取り消しできません。</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleDeleteDialogClose}>
              キャンセル
            </Button>
            <Button color="secondary" onClick={deleteMinutes} autoFocus>
              削除
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box className="minutes">
        {props.minutes.content.split(/\r\n|\r|\n/).map((row, index) => (
          <Typography key={index} variant="h6" component="p">
            {row}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

/*================================================
 Styling
================================================*/
const styles = {
  titleContainer: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    margin-top: 2em;

    & > *:last-child {
      margin-left: auto;
    }
  `,
}
