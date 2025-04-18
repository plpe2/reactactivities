import { AppBar, Button, IconButton, Stack, Toolbar, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';


function NavBar() {
  const [sideBar, setSideBar] = useState(false)

  const toggleSidebar = () =>{
    setSideBar(prev => !prev)
  }
  const navStyle = {
    padding: 1.5,
    marginBottom: "20px" 
  }

  return (
    <AppBar position='static' color='info' sx={navStyle}>
      <Toolbar>
      <Button variant='contained' onClick={toggleSidebar}>{sideBar ? '=' : '=>'}</Button>
      <Link to="/"><Button variant="contained" size="large" startIcon={<ShoppingCartIcon />}>Add2Cart</Button></Link>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} className="Navbar">
          <Link to="/login"><Button variant='contained'>Login</Button></Link>
          <Link to="/register"><Button variant='contained'>Register</Button></Link>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
