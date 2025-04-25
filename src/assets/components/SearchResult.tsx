import { Box, Button, Card, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
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

    type deleteUser = {
        id: number | null,
        name: string
    }

    const [searchResults, setSearchResults] = useState<user[]>([])
    const {val} = useParams()

    const [deleteShow, setDeleteShow] = useState(false) 
    const [deleteValue, setDeleteValue] = useState<deleteUser>({
        id: null,
        name: ""
    })
    const [resultDelete, setResultDelete] = useState(false)

    useEffect(() => {
        axios.post(`/search-results/${val}`)
        .then((res) =>{
            setSearchResults(res.data)
        })
    }, [val])

    const DeleteUser = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.delete(`/delete-user/${deleteValue.id}`)
        .then((res) =>{
            setResultDelete(true); // show dialog
            setTimeout(() => {
                setResultDelete(false); // hide dialog (optional)
              window.location.reload(); // reload page
            }, 5000);
        })
    }

  return (
    <>
        <Box width="90%" sx={{justifyContent: "center", marginLeft: "5%", padding: "1%"}}>
            <Typography variant="h5" color="initial">Search Results</Typography>
            {searchResults.map(users => (
            <div key={users.id}>
                <Stack sx={{padding: "50px", backgroundColor: "#DAE3FF", margin: "10px"}} spacing={2}>
                <Stack key={users.id}>
                    <Typography>{users.name}</Typography>
                    
                </Stack>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button variant='contained' href={`/view-user/${users.id}`}>View Profile</Button>
                    <Button 
                    variant='contained' 
                    color='error' 
                    onClick={
                        () => 
                        {
                            setDeleteShow(true) 
                            setDeleteValue({id : users.id, name : users.name})
                        }
                    }>
                        Delete Profile
                </Button>
                </Stack>        
                </Stack>
            </div >
        ))}
        </Box>
        <Dialog open={deleteShow} onClose={() => setDeleteShow(false)} aria-labelledby="delete-user-dialog">
            <DialogTitle >
            Delete permanently this user?
            </DialogTitle>
            <DialogContent>
            <DialogContentText>Name: {deleteValue.name}</DialogContentText>
            </DialogContent>
            <DialogActions>
            <form onSubmit={DeleteUser}>
            <Button
                color="error"
                variant='contained'
                type='submit'
            >
                Yes
            </Button>
            </form>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => 
                    {
                        setDeleteShow(false) 
                        setDeleteValue({ id : null, name: ""})
                    }
                }>
                Cancel
            </Button>
            </DialogActions>
        </Dialog>

    <Dialog open={resultDelete}>
        <DialogTitle>Successfully Deleted the User</DialogTitle>
        <DialogContent>
            <DialogContentText>
            3 seconds before returning to page...
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant='contained' onClick={() => window.location.reload()}>Close</Button>
        </DialogActions>
    </Dialog>

    </>
  )
}

export default SearchResult
