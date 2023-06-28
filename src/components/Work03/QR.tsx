import { QRCode } from 'react-qrcode-logo'

import Backdrop from '@mui/material/Backdrop'
import { styled } from '@mui/material/styles'

const TodoBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#ffffff',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
}))

type Props = {
  open: boolean
  onClose: () => void
}

export const QR = (props: Props) => (
  <TodoBackdrop open={props.open} onClick={props.onClose}>
    <QRCode value="http://localhost:5173/" />
  </TodoBackdrop>
)
