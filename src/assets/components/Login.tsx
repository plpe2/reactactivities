import React, { useState } from 'react'
import NavBar from './NavBar'
import '../styles/Login.css'
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

function Login() {
  const [labelEmail, setlabelEmail] = useState("Enter your Email")
  const [labelPassword, setlabelPassword] = useState("Enter your Password")

  return (
    <div>
        <NavBar />
      <center>
      <Box width="500px">
        <Card>
            <CardContent>
                <Typography gutterBottom variant='h4'>Login</Typography>
                <TextField id="outlined-basic" label={labelEmail} variant="outlined" onFocus={(e) => {setlabelEmail('Email')}} onBlur={(e) => {setlabelEmail('Enter your Email')}}/><br/><br/>
                <TextField id="outlined-basic" label={labelPassword} variant="outlined" onFocus={(e) => {setlabelPassword('Password')}} onBlur={(e) => {setlabelPassword('Enter your Password')}}/>
            </CardContent>
            <CardActions className='Actionbuttons'>
              <Button variant='contained'>Login</Button>
              <Button variant='contained' color='success' href='/register'>Register</Button>
            </CardActions>
        </Card>
      </Box>
      </center>
    </div>
  )
}

export default Login
