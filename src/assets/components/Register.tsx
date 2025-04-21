import React, { useState } from 'react'
import NavBar from './NavBar'
import '../styles/App.css'
import '../styles/Register.css'
import { Box, Button, Card, CardActions, CardContent, MenuItem, TextField, Typography } from '@mui/material'
import { Luzon, Visayas, Mindanao } from './Zipcodes'

function Register() {
  const [label, setLabel] = useState("Email")
  const [province, setProvince] = useState("")
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleProvince = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setProvince(e.target.value as string)
  }

  const handleCities = () =>{
    if(province === "Luzon"){
      return (
        <>
          {Luzon.map((city) => {
            return (
              <>
                <MenuItem value={city.zipCode}>{city.city}</MenuItem>
              </>
            )
          })}
        </>
      )
    }else if(province === "Visayas"){
      return (
        <>
          {Visayas.map((city) => {
            return (
              <>
                <MenuItem value={city.zipCode}>{city.city}</MenuItem>
              </>
            )
          })}
        </>
      )
    }else if(province === "Mindanao"){
      return (
        <>
          {Mindanao.map((city) => {
            return (
              <>
                <MenuItem value={city.zipCode}>{city.city}</MenuItem>
              </>
            )
          })}
        </>
      )
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    setTimeout(() => {
      console.log("Submitted values:", values)
    }, 0)
  }
  return (
    <div>
      <center>
        <Box width="500px">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardContent>
                  <Typography gutterBottom variant='h4'>Register</Typography>
                  <TextField label="Name" id="outlined-basic" variant="outlined" onChange={(e) => setValues({...values, name: e.target.value})}/><br/><br/>
                  <TextField label="Email" id="outlined-basic" variant="outlined" onChange={(e) => setValues({...values, email: e.target.value})}/><br/><br/>
                  <TextField label="Password" id="outlined-basic" variant="outlined" onChange={(e) => setValues({...values, password: e.target.value})}/><br/><br/>
                  <TextField label="Select Province" select onChange={handleProvince} sx={{width: "230px"}} >
                    <MenuItem value="Luzon">Luzon</MenuItem>
                    <MenuItem value="Visayas">Visayas</MenuItem>
                    <MenuItem value="Mindanao">Mindanao</MenuItem>
                  </TextField><br/><br/>
                  <TextField select label="Select Address" sx={{width: "230px"}}>
                  {handleCities()}
                  </TextField>
              </CardContent>
              <CardActions className='Actionbuttons'>
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
