import {
  Box,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  FormControlLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewUsers() {
  type Results = {
    id: number;
    name: string;
    password: string;
    email: string;
    gender: string;
    address: string;
    mobile: string;
    status: string;
  };

  type UserType = {
    id: number | null;
    name: string;
    password: string;
    email: string;
    gender: string;
    address: string;
    mobile: string;
    status: string;
  };

  const [updatestate, setUpdateState] = useState(false);

  // State to hold the dialog for viewing a user's profile
  const [viewProfile, setViewProfile] = useState(false);

  // State to hold the dialog for deleting a user
  const [deleteShow, setDeleteShow] = useState(false);
  const [resultDelete, setResultDelete] = useState(false);

  // State to hold the selected user for displaying profile
  const [selectedUser, setSelectedUser] = useState<UserType>({
    id: null,
    name: "",
    password: "",
    email: "",
    gender: "",
    address: "",
    mobile: "",
    status: "",
  });

  // State to hold the results from User Deletion
  const [results, setResults] = useState<Results[]>([]);
  const [countdown, setCountdown] = useState(3);

  // API call to get all users
  useEffect(() => {
    axios.post("/view-users").then((res) => {
      setResults(res.data);
      console.log(res.data);
    });
  }, []);

  // API call to delete a user
  // This function is called when the delete button is clicked
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

  const updateUserView = () => {
    if (updatestate) {
      return (
        <Stack spacing={2}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={selectedUser.address}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, address: e.target.value })
            }
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            value={selectedUser.gender}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, gender: e.target.value })
            }
          />
          <TextField
            label="Mobile"
            variant="outlined"
            fullWidth
            value={selectedUser.mobile}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, mobile: e.target.value })
            }
          />
          <TextField
            label="Password"
            variant="outlined"
            value={selectedUser.password}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, password: e.target.value })
            }
          />
        </Stack>
      );
    } else {
      return (
        <Box>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Name:</strong> {selectedUser.name}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Email:</strong> {selectedUser.email}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Address:</strong> {selectedUser.address}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Gender:</strong> {selectedUser.gender}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Mobile:</strong> {selectedUser.mobile}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            <strong>Password:</strong> {selectedUser.password}
          </Typography>
        </Box>
      );
    }
  };

  const handleUpdateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.put("/update-user", selectedUser)
    .then((res) =>{
      window.location.reload()
    })
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
                    setViewProfile(true);
                    setSelectedUser({
                      id: users.id,
                      name: users.name,
                      password: users.password,
                      email: users.email,
                      gender: users.gender,
                      address: users.address,
                      mobile: users.mobile,
                      status: users.status,
                    });
                  }}
                >
                  View Profile
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setDeleteShow(true);
                    setSelectedUser({
                      ...selectedUser,
                      id: users.id,
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
            width: "400px",
            height: "auto",
            padding: "20px",
          },
        }}
      >
        <DialogTitle id="view-user-dialog">User Profile</DialogTitle>
        <DialogContent>
          <FormControlLabel
            label="Update User"
            control={
              <Switch
                value=""
                checked={updatestate}
                onChange={() => setUpdateState(!updatestate)}
              />
            }
          />
          {updateUserView()}
        </DialogContent>
        <DialogActions>
          <form onSubmit={handleUpdateUser}>
            <Button
              variant="contained"
              color="success"
              disabled={!updatestate}
              type="submit"
            >
              Update
            </Button>
          </form>
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
            By Clicking Delete, the User: {selectedUser.name} will be
            permanently deleted
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
              setSelectedUser({
                id: null,
                name: "",
                password: "",
                email: "",
                gender: "",
                address: "",
                mobile: "",
                status: "",
              });
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
