import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

type Props = {
  filter: Filter
  onToggleDrawer: () => void
}

export const translator = (arg: Filter) => {
  switch (arg) {
    case 'all':
      return 'すべてのタスク'
    case 'checked':
      return '完了したタスク'
    case 'unchecked':
      return '現在のタスク'
    case 'removed':
      return 'ゴミ箱'
    default:
      return 'TODO'
  }
}

export const ButtonAppBar = (props: Props) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={props.onToggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {translator(props.filter)}
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
)
