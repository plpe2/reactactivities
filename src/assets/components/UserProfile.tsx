import { Box, Button, Stack, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  type user = {
    id: number;
    name: string;
    password: string;
    status: string;
  };

  const [userValues, setUserValues] = useState<user[]>([]);
  const { id } = useParams();
  const [updateResult, setUpdateResult] = useState(false)

  useEffect(() => {
    axios.post(`/user-profile/${id}`).then((res) => {
      setUserValues(res.data);
    });
  }, [id]);

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put(`/update-user/${id}`, userValues[0])
    .then((res) =>{
      window.location.reload()
    })
  };

  return (
    <>
      <Box width="90%" sx={{ justifyContent: "center", marginLeft: "5%", padding: "1%" }}>
        <Typography variant="h5" color="initial">User Profile</Typography>
        <Stack sx={{ padding: "50px", backgroundColor: "#DAE3FF" }}>
          {userValues.map((user, index) => {
            return (
              <Stack key={user.id} sx={{width: "50%"}}>
                <Typography>Full Name:</Typography>
                  <TextField
                    type="text"
                    value={user.name}
                    onChange={(e) => setUserValues([{...userValues[0], name : e.target.value}])}
                  />
                  <Typography>Status: {user.status}</Typography>
                  <Button variant="contained" color="success" onClick={() => setUpdateResult(true)}>
                    Update Profile
                  </Button>
              </Stack>
            );
          })}
        </Stack>
      </Box>

          {/* Update Confirmation */}
      <Dialog open={updateResult} onClose={() => setUpdateResult(false)} aria-labelledby="update-result-dialog">
        <DialogTitle>
          Update profile details?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            By clicking update, the profile details will be modified
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <form onSubmit={handleUpdateProfile}>
            <Button variant="contained" color="success"  type="submit">
              Update
            </Button>
          </form>
          <Button
            onClick={() => setUpdateResult(false)}
            color="error"
            variant="contained" 
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserProfile;
