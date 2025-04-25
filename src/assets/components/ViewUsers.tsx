import { Box, Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ViewUsers() {
    type Results = {
        id: number,
        name: string,
        password: string,
        status: string
    }

    const [results, setResults] = useState<Results[]>([])

    useEffect(() =>{
        axios.post("/view-users")
        .then((res) => {
            setResults(res.data)
            console.log(res.data)
        })
    }, [])
  return (
    <Box width="90%" sx={{justifyContent: "center", marginLeft: "5%", padding: "1%"}}>
        <Typography variant="h5" color="initial">View All Users</Typography>
        {results.map(users => (
        <div key={users.id}>
            <Stack sx={{padding: "50px", backgroundColor: "red", margin: "10px"}}>
            <Stack key={users.id}>
                <Typography>{users.name}</Typography>
                
            </Stack>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant='contained' href={`/view-user/${users.id}`}>View Profile</Button>
                <form>
                    <Button type='submit' variant='contained' color='error'>Delete Profile</Button>
                </form>
            </Stack>        
            </Stack>
        </div >
    ))}
    </Box>
  )
}

export default ViewUsers
