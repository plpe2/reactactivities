import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  Box,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

function NavBar() {
  type User = {
    name: string;
    email: string;
    mobile: string;
    address: string;
    gender: string;
    password: string;
    cpassword: string;
  };

  type LoginValues = {
    email: string;
    password: string;
  };

  const [searchvalue, setSearchValue] = useState("");
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [values, setValues] = useState<User>({
    name: "",
    email: "",
    mobile: "",
    address: "",
    gender: "",
    password: "",
    cpassword: "",
  });

  const [loginValues, setLoginValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/search-results/${searchvalue}`;
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/login", loginValues).then((res) => {
      console.log(res);
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/register/user-create", values).then((res) => {
      window.location.reload();
    })
  };

  const navStyle = {
    padding: 1.5,
    marginBottom: "20px",
  };

  return (
    <AppBar position="static" color="info" sx={navStyle}>
      <Toolbar>
        <Link to="/">
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
          >
            Add2Cart
          </Button>
        </Link>
        <Box sx={{ flexGrow: 1 }} />

        {/* Search bar */}
        <Stack direction="row" height="50px">
          <form onSubmit={handleSearchSubmit}>
            <TextField
              size="small"
              onChange={(e) => setSearchValue(e.target.value)}
              required
            >
              Search
            </TextField>
            <IconButton
              type="submit"
              aria-label=""
              sx={{ backgroundColor: "white", marginRight: "20px" }}
            >
              <SearchIcon />
            </IconButton>
          </form>
        </Stack>

        <Stack direction="row" spacing={2} className="Navbar">
          {/* Two buttons on right side*/}
          <Button variant="contained" onClick={() => setOpenLogin(true)}>
            Login
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenRegister(true)}
          >
            Register
          </Button>

          {/* Login Dialog */}
          <Dialog
            open={openLogin}
            onClose={() => setOpenLogin(false)}
            aria-labelledby="login-dialog"
          >
            <DialogTitle>Login</DialogTitle>
            <form onSubmit={handleLoginSubmit}>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <Stack spacing={2}>
                  <TextField
                    onChange={(e) =>
                      setLoginValues({ ...loginValues, email: e.target.value })
                    }
                    label="Email Address"
                  />
                  <TextField
                    onChange={(e) =>
                      setLoginValues({
                        ...loginValues,
                        password: e.target.value,
                      })
                    }
                    label="Password"
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => setOpenLogin(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => setOpenLogin(false)}
                >
                  Login
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          {/* Register Dialog */}
          <Dialog
            open={openRegister}
            sx={{ width: "100%" }}
            onClose={() => setOpenRegister(false)}
            aria-labelledby="register-dialog"
          >
            <DialogTitle>Registration</DialogTitle>
            <DialogContentText></DialogContentText>
            <form onSubmit={handleRegisterSubmit}>
              <DialogContent>
                <Stack spacing={2}>
                  <TextField
                    label="Full Name"
                    required
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                  />
                  <TextField
                    label="Email Address"
                    required
                    type="email"
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                  <TextField
                    label="Password"
                    type="password"
                    required
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={(e) => {
                      setValues({ ...values, cpassword: e.target.value });
                    }}
                  />
                  <TextField
                    label="Address"
                    required
                    onChange={(e) =>
                      setValues({ ...values, address: e.target.value })
                    }
                  />
                  <TextField
                    label="Gender"
                    required
                    onChange={(e) =>
                      setValues({ ...values, gender: e.target.value })
                    }
                  />
                  <TextField
                    label="Mobile No"
                    required
                    type="tel"
                    onChange={(e) =>
                      setValues({ ...values, mobile: e.target.value })
                    }
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenRegister(false)}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="success" type="submit">
                  Register
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
