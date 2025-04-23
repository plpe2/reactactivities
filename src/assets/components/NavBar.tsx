import { AppBar, Button, Stack, Toolbar, Box, IconButton, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';


function NavBar() {
  const [sideBar, setSideBar] = useState(false)
  const [searchshow, setSearchShow] = useState(false)
  const [searchvalue, setSearchValue] = useState("")
  

  const toggleSidebar = () =>{
    setSideBar(prev => !prev)
  }

  const toggleSearch = () => {
    setSearchShow(prev => !prev)
  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log(searchvalue)
  }

  const navStyle = {
    padding: 1.5,
    marginBottom: "20px" 
  }

  return (
    <AppBar position='static' color='info' sx={navStyle}>
      <Toolbar>
        {searchvalue}
      <Button variant='contained' onClick={toggleSidebar}>{sideBar ? '=' : '=>'}</Button>
      <Link to="/"><Button variant="contained" size="large" startIcon={<ShoppingCartIcon />}>Add2Cart</Button></Link>
      <Box sx={{ flexGrow: 1 }} />
      <Stack direction='row' height="50px">
      <form onSubmit={handleSubmit}>
      <TextField size='small' onChange={(e) => setSearchValue(e.target.value)}>
          Search 
      </TextField>
      <IconButton type='submit' aria-label="" sx={{backgroundColor: "white", marginRight: "20px"}} onClick={toggleSearch} href={`/search-results/${searchvalue}`}>
        <SearchIcon/>
      </IconButton>
      </form>
      </Stack>
      <Stack direction="row" spacing={2} className="Navbar">
        <Link to="/login"><Button variant='contained'>Login</Button></Link>
        <Link to="/register"><Button variant='contained'>Register</Button></Link>
      </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
