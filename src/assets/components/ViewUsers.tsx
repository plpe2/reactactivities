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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function ViewUsers() {
  type Results = {
    id: number;
    name: string;
    password: string;
    status: string;
  };

  type deleteUser = {
    id: number | null;
    name: string;
  };

  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteValue, setDeleteValue] = useState<deleteUser>({
    id: null,
    name: "",
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
    axios.delete(`/delete-user/${deleteValue.id}`).then((res) => {
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
                <Button variant="contained" href={`/view-user/${users.id}`}>
                  View Profile
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setDeleteShow(true);
                    setDeleteValue({ id: users.id, name: users.name });
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
        open={deleteShow}
        onClose={() => setDeleteShow(false)}
        aria-labelledby="delete-user-dialog"
      >
        <DialogTitle>Delete permanently this user?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By Clicking Delete, the User: {deleteValue.name} will be permanently
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
              setDeleteValue({ id: null, name: "" });
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

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
