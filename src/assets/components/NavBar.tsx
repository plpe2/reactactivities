import { AppBar, Button, Stack, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'


function NavBar() {
  return (
    <AppBar>
      <Toolbar>
      <Stack direction="row" spacing={2}>
        <Button><Link to="/">Dashboard</Link></Button>
        <Button><Link to="/login">Login</Link></Button>
        <Button><Link to="/register">Register</Link></Button>
      </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
