import { useEffect } from 'react'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

/*================================================
 Definitions
================================================*/
type Props = {
  open: boolean
}

/*================================================
 Component
================================================*/
export const Loader = (props: Props) => {
  // 表示に応じたスタイル適用
  const toggleStyle = (sw: boolean) => {
    document.body.style.overflow = sw ? 'hidden' : 'visible'
  }

  useEffect(() => {
    toggleStyle(true)
    return () => toggleStyle(false)
  }, [])

  return (
    <Backdrop open={props.open} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress />
    </Backdrop>
  )
}
