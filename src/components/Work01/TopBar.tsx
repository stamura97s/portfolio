import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import { BAR_STYLE } from './common/const'

/*================================================
 Definitions
================================================*/
type Props = {
  drawerOpen: boolean
  onDrawerOpen: () => void
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

/*================================================
 Component
================================================*/
export const TopBar = (props: Props) => {
  return (
    <AppBar position="fixed" open={props.drawerOpen}>
      <Toolbar>
        <IconButton
          aria-label="open menu"
          color="inherit"
          edge="start"
          sx={{ mr: 2, ...(props.drawerOpen && { display: 'none' }) }}
          onClick={props.onDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="h1" noWrap>
          議事録作成
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

/*================================================
 Styling
================================================*/
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  [theme.breakpoints.up('md')]: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${BAR_STYLE.DRAWER_WIDTH})`,
      marginLeft: `${BAR_STYLE.DRAWER_WIDTH}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}))
