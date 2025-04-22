import React, { useContext, useState } from 'react'
import NavBar from './NavBar'
import '../styles/Login.css'
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios'

function Login() {
  const [labelEmail, setlabelEmail] = useState("Enter your Email")
  const [labelPassword, setlabelPassword] = useState("Enter your Password")

  const [values, setValues] = useState({
    name: "",
    password: ""
  })

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    
    axios.post("/login", values)
    .then((res) =>{
      console.log(res)
    })
    .catch((err) =>{
      console.log(err)
    })
  }
  return (
    <div>
      <center>
      <Box width="500px" >
        <Card>
            <form onSubmit={handleSubmit}>
            <CardContent>
                <Typography gutterBottom variant='h4'>Login</Typography>
                <TextField id="outlined-basic" label={labelEmail} variant="outlined" onChange={(e) => {setValues({...values, name: e.target.value})}} onFocus={(e) => {setlabelEmail('Email')}} onBlur={(e) => {setlabelEmail('Enter your Email')}}/><br/><br/>
                <TextField id="outlined-basic" label={labelPassword} variant="outlined" onChange={(e) => {setValues({...values, password: e.target.value})}} onFocus={(e) => {setlabelPassword('Password')}} onBlur={(e) => {setlabelPassword('Enter your Password')}}/>
            </CardContent>
            <CardActions className='Actionbuttons'>
              <Button variant='contained' type='submit'>Login</Button>
              <Button variant='contained' color='success' href='/register'>Register</Button>
            </CardActions>
            </form>
        </Card>
        
      </Box>
      </center>
    </div>
  )
}

export default Login
