import { AppBar, Button, Stack, Toolbar, Box, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useContext, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function NavBar() {
  type User = {
    name: string,
    email: string,
    password: string,
    cpassword: string
  }

  const [sideBar, setSideBar] = useState(false)
  const [searchshow, setSearchShow] = useState(false)
  const [searchvalue, setSearchValue] = useState("")
  const [openRegister, setOpenRegister] = useState(false)

  const [values, setValues] = useState<User>({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })

  const toggleSidebar = () =>{
    setSideBar(prev => !prev)
  }

  const toggleSearch = () => {
    setSearchShow(prev => !prev)
  }

  const handleSearchSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    console.log(searchvalue)
  }

  const handleRegisterSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    axios.post("/register/user-create", values)
    .then((res) => {
      window.location.reload()
    })  
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
      <form onSubmit={handleSearchSubmit}>
      <TextField size='small' onChange={(e) => setSearchValue(e.target.value)}>
          Search 
      </TextField>
      <IconButton type='submit' aria-label="" sx={{backgroundColor: "white", marginRight: "20px"}} onClick={toggleSearch} href={`/search-results/${searchvalue}`}>
        <SearchIcon/>
      </IconButton>
      </form>
      </Stack>
      <Stack direction="row" spacing={2} className="Navbar">
        <Link to="/login">
          <Button variant='contained'>
            Login
          </Button>
        </Link>
        <Button variant='contained' color='success' onClick={() => setOpenRegister(true)}>
          Register
        </Button>

        <Dialog open={openRegister} sx={{width: "100%"}} aria-labelledby='register-dialog'>
          <DialogTitle>Registration</DialogTitle>
          <DialogContentText></DialogContentText>
          <form onSubmit={handleRegisterSubmit}>
          <DialogContent >
            <Stack spacing={2}>
              <TextField label="Full Name" onChange={(e) => setValues({ ...values, name: e.target.value})}/>
              <TextField label="Email Address" onChange={(e) => setValues({ ...values, email: e.target.value})}/>
              <TextField label="Password" onChange={(e) => setValues({ ...values, password: e.target.value})}/>
              <TextField label="Confirm Password" onChange={(e) => setValues({ ...values, cpassword: e.target.value})}/>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="success" type='submit'>
              Register
            </Button>
            <Button variant="contained" color="error" onClick={() => setOpenRegister(false)}>
              Cancel
            </Button>
          </DialogActions>
          </form>
        </Dialog>
        {/* <Link to="/register"><Button variant='contained'>Register</Button></Link> */}
      </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
