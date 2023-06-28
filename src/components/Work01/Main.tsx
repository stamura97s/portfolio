import { styled } from '@mui/material/styles'

import { BAR_STYLE } from './common/const'

/*================================================
 Definitions
================================================*/
type Props = {
  drawerOpen: boolean
  children: React.ReactNode
}

/*================================================
 Component
================================================*/
export const Main = (props: Props) => {
  return (
    <MainBox open={props.drawerOpen}>
      <DrawerHeader />
      {props.children}
    </MainBox>
  )
}

/*================================================
 Styling
================================================*/
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const MainBox = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  padding: theme.spacing(3),

  [theme.breakpoints.up('md')]: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${BAR_STYLE.DRAWER_WIDTH}`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  },
}))
