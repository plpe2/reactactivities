import { Box, Button, Card, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function SearchResult() {
    type user = {
        id: number,
        name: string,
        password: string,
        status: string
    }

    const [searchResults, setSearchResults] = useState<user[]>([])
    const {val} = useParams()
    const [deleteId, setDeleteId] = useState<number>()

    useEffect(() => {
        axios.post(`/search-results/${val}`)
        .then((res) =>{
            setSearchResults(res.data)
        })
    }, [val])

    const DeleteUser = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (deleteId !== undefined) {
            axios.delete(`/delete-user/${deleteId}`)
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
        }

    }

  return (
    <Box width="50%" sx={{justifyContent: "center", marginLeft: "10%"}}>
        {searchResults.map(users => (
        <div key={users.id}>
            <Stack sx={{padding: "50px", backgroundColor: "red", margin: "10px"}}>
            <Stack key={users.id}>
                <Typography>{users.name}</Typography>
                
            </Stack>
            <Stack direction="row">
                <Button variant='contained' href={`/view-user/${users.id}`}>View Profile</Button>
                <form onSubmit={DeleteUser}>
                    <Button type='submit' variant='contained' color='error' onClick={(e) => setDeleteId(users.id)}>Delete Profile</Button>
                </form>
            </Stack>        
            </Stack>
        </div >
    ))}
    </Box>
  )
}

export default SearchResult
