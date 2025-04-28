import {
  Box,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions, Accordion, AccordionSummary, AccordionDetails,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewUsers() {
  type Results = {
    id: number,
    name: string,
    password: string,
    email: string,
    gender: string,
    address: string,
    mobile: string,
    status: string
  };

  type UserType = {
    id: number | null;
    name: string,
    password: string,
    email: string,
    gender: string,
    address: string,
    mobile: string,
    status: string,
  };

  const [viewProfile, setViewProfile] = useState(false);

  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType>({
    id: null,
    name: "",
    password: "",
    email: "",
    gender: "",
    address: "",
    mobile: "",
    status: ""
  });
  
  const [resultDelete, setResultDelete] = useState(false);

  const [results, setResults] = useState<Results[]>([]);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    axios.post("/view-users").then((res) => {
      setResults(res.data);
      console.log(res.data);
    });
  }, []);

  const handledeleteUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.delete(`/delete-user/${selectedUser.id}`).then((res) => {
      setResultDelete(true); // show dialog
      setCountdown(3); // reset countdown

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            window.location.reload();
          }
          return prev - 1;
        });
      }, 1000);
    });
  };
  return (
    <>
      <Box
        width="90%"
        sx={{ justifyContent: "center", marginLeft: "5%", padding: "1%" }}
      >
        <Typography variant="h5" color="initial">
          View All Users
        </Typography>

        {/* Display Users */}
        {results.map((users) => (
          <div key={users.id}>
            <Stack
              sx={{ 
                padding: "50px",
                backgroundColor: "#DAE3FF",
                margin: "10px",
              }}
            >
              <Stack key={users.id}>
                <Typography>{users.name}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button 
                  variant="contained" 
                  onClick={() => {
                    setViewProfile(true)
                    setSelectedUser({ 
                      id: users.id, 
                      name: users.name, 
                      password: users.password, 
                      email: users.email, 
                      gender: users.gender, 
                      address: users.address, 
                      mobile: users.mobile, 
                      status: users.status 
                    });
                  }}>
                  View Profile
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setDeleteShow(true);
                    setSelectedUser({ 
                      id: users.id, 
                      name: users.name, 
                      password: users.password, 
                      email: users.email, 
                      gender: users.gender, 
                      address: users.address, 
                      mobile: users.mobile, 
                      status: users.status 
                    });
                  }}
                >
                  Delete Profile
                </Button>   
              </Stack>
            </Stack>
          </div>
        ))}
      </Box>

      <Dialog 
        open={viewProfile} 
        onClose={() => setViewProfile(false)} 
        aria-labelledby="view-user-dialog"
        PaperProps={{
          sx: {
        width: '400px',
        height: 'auto',
        padding: '20px',
          },
        }}
      >
        <DialogTitle id="view-user-dialog">
          User Profile
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Name:</strong> {selectedUser.name}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Email:</strong> {selectedUser.email}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Address:</strong> {selectedUser.address}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Gender:</strong> {selectedUser.gender}</Typography>
        <Typography variant="body1" sx={{ marginBottom: '10px' }}><strong>Mobile:</strong> {selectedUser.mobile}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
        variant="contained"
        onClick={() => setViewProfile(false)}
        color="primary"
          >
        Cancel
          </Button>
        </DialogActions>
      </Dialog>


      {/* Confirmation Dialog */}
      <Dialog
        open={deleteShow}
        onClose={() => setDeleteShow(false)}
        aria-labelledby="delete-user-dialog"
      >
        <DialogTitle>Delete permanently this user?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By Clicking Delete, the User: {selectedUser.name} will be permanently
            deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <form onSubmit={handledeleteUser}>
            <Button color="error" variant="contained" type="submit">
              Yes
            </Button>
          </form>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setDeleteShow(false);
              setSelectedUser({ id: null, name: "", password: "", email: "", gender: "", address: "", mobile: "", status: "" });
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Result Dialog fron Deleting */}
      <Dialog open={resultDelete}>
        <DialogTitle>Successfully Deleted the User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Returning to page in {countdown} second{countdown !== 1 ? "s" : ""}
            ...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ViewUsers;
