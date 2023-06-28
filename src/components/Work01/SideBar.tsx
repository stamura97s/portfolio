import { useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import MuiListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import AddIcon from '@mui/icons-material/Add'
import NoteIcon from '@mui/icons-material/Note'

import { BAR_STYLE } from './common/const'

/*================================================
 Definitions
================================================*/
type Props = {
  drawerOpen: boolean
  onDrawerClose: () => void
  storedMinutes: Minutes[]
  showMinutes: (date: Minutes['date'] | null) => void
}

/*================================================
 Component
================================================*/
export const SideBar = (props: Props) => {
  const theme = useTheme()
  const isPCSize = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Drawer
      variant={isPCSize ? 'persistent' : 'temporary'}
      anchor="left"
      open={props.drawerOpen}
      onClose={props.onDrawerClose}
    >
      <DrawerHeader sx={{ justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          fullWidth
          sx={{ justifyContent: 'flex-start' }}
          startIcon={<AddIcon />}
          onClick={() => props.showMinutes(null)}
        >
          新規作成
        </Button>
        <IconButton onClick={props.onDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {props.storedMinutes.map((minutes) => (
          <ListItem key={minutes.date} disablePadding>
            <ListItemButton onClick={() => props.showMinutes(minutes.date)}>
              <ListItemIcon>
                <Avatar>
                  <NoteIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={minutes.title}
                secondary={new Date(minutes.date).toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

/*================================================
 Styling
================================================*/
const Drawer = styled(MuiDrawer)(() => ({
  width: BAR_STYLE.DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: BAR_STYLE.DRAWER_WIDTH,
    boxSizing: 'border-box',
  },
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const ListItemText = styled(MuiListItemText)(() => ({
  '& > *': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}))
