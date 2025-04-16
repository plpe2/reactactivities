import React, { useState } from 'react'
import NavBar from './NavBar'
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'

function Register() {
  const [label, setLabel] = useState("Email")
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setTimeout(() => {
      console.log("Submitted values:", values)
    }, 0)
  }
  return (
    <div>
      <NavBar />
      <br/><br/>
      <center>
        <Box width="500px">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardContent>
                  <Typography gutterBottom variant='h4'>Register</Typography>
                  <TextField label="Name" id="outlined-basic" variant="outlined" onChange={(e) => setValues({...values, name: e.target.value})}/><br/><br/>
                  <TextField label="Email" id="outlined-basic" variant="outlined" onChange={(e) => setValues({...values, email: e.target.value})}/><br/><br/>
                  <TextField label="Password" id="outlined-basic" variant="outlined" onChange={(e) => setValues({...values, password: e.target.value})}/>
              </CardContent>
              <CardActions>
                <Button type='submit' variant='contained' color='secondary'>Register</Button>
              </CardActions>
              </form>
          </Card>
        </Box>
        </center>
    </div>
  )
}

export default Register
