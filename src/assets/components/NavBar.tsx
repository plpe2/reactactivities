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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
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

  const [showHelper, setShowHelper] = useState(false);
  //Register dialog state handler
  const [showHelperReg, setShowHelperReg] = useState(false);
  const [showNameHelper, setShowNameHelper] = useState(false);
  const [showPassHelper, setShowPassHelper] = useState(false);
  const [showCpassHelper, setShowCpassHelper] = useState(false);
  const [showAddressHelper, setShowAddressHelper] = useState(false);
  const [showGenderHelper, setShowGenderHelper] = useState(false);
  const [showMobileHelper, setShowMobileHelper] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = `/search-results/${searchvalue}`;
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileFormat = /[0-9]{10}/;
    if (!loginValues.email || !emailRegex.test(loginValues.email)) {
      setShowHelper(true);
      return;
    }
    axios.post("/login", loginValues).then((res) => {
      console.log(res);
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    if (!values.name) {
      setShowNameHelper(true);
      hasError = true;
    }
    if (!values.email || !emailRegex.test(values.email)) {
      setShowHelperReg(true);
      hasError = true;
    }
    if (!values.password || values.password.length <= 7) {
      setShowPassHelper(true);
      hasError = true;
    }
    if (!values.cpassword || values.password !== values.cpassword) {
      setShowCpassHelper(true);
      hasError = true;
    }
    if (!values.address) {
      setShowAddressHelper(true);
      hasError = true;
    }
    if (!values.mobile) {
      setShowMobileHelper(true);
      hasError = true;
    }
    if (!values.gender) {
      setShowGenderHelper(true);
      hasError = true;
    }
    if (hasError) {
      return;
    }
    axios.post("/register/user-create", values).then((res) => {
      window.location.reload();
    });
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
        <Stack direction="row" height="50px" sx={{ marginRight: "10px" }}>
          <form
            onSubmit={handleSearchSubmit}
            style={{ display: "flex", alignItems: "center" }}
          >
            <TextField
              size="small"
              onChange={(e) => setSearchValue(e.target.value)}
              required
              placeholder="Search..."
              sx={{
                backgroundColor: "white",
                borderRadius: "5px",
                input: { color: "black" },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
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
            onClose={() => {
              setOpenLogin(false);
              setShowHelper(false);
            }}
            aria-labelledby="login-dialog"
          >
            <DialogTitle>Login</DialogTitle>
            <form onSubmit={handleLoginSubmit}>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <Stack spacing={2}>
                  <TextField
                    onBlur={() => {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (
                        !loginValues.email ||
                        !emailRegex.test(loginValues.email)
                      ) {
                        setShowHelper(true);
                      }
                    }}
                    onFocus={() => {
                      setShowHelper(false);
                    }}
                    helperText={
                      showHelper ? "Please enter a valid email address" : ""
                    }
                    onChange={(e) =>
                      setLoginValues({ ...loginValues, email: e.target.value })
                    }
                    error={showHelper}
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
                  onClick={() => {
                    setOpenLogin(false);
                    setShowHelper(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Login
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          {/* Register Dialog */}
          <Dialog
            open={openRegister}
            sx={{ width: "100%" }}
            onClose={() => {
              setOpenRegister(false);
              setShowHelperReg(false);
              setShowNameHelper(false);
              setShowPassHelper(false);
              setShowCpassHelper(false);
              setShowAddressHelper(false);
              setShowMobileHelper(false);
            }}
            aria-labelledby="register-dialog"
            PaperProps={{
              sx: {
                width: "500px",
                height: "auto",
                padding: "20px",
              },
            }}
          >
            <DialogTitle>Registration</DialogTitle>
            <DialogContentText>
              <Box sx={{ marginLeft: "20px" }}>
                - Fields marked with <span style={{ color: "red" }}>*</span> are
                required.
              </Box>
            </DialogContentText>
            <form onSubmit={handleRegisterSubmit}>
              <DialogContent>
                <Stack spacing={2}>
                  <TextField
                    label="Full Name*"
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, name: e.target.value })
                    }
                    onFocus={() => setShowNameHelper(false)}
                    helperText={
                      showNameHelper ? "Please Enter Your Full Name" : ""
                    }
                    error={showNameHelper}
                  />
                  <TextField
                    onBlur={() => {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!values.email || !emailRegex.test(values.email)) {
                        setShowHelperReg(true);
                      }
                    }}
                    onFocus={() => {
                      setShowHelperReg(false);
                    }}
                    helperText={
                      showHelperReg
                        ? !values.email
                          ? "Email is required"
                          : "Please enter a valid email address"
                        : ""
                    }
                    onChange={(e) => {
                      const newEmail = e.target.value;
                      setValues({ ...values, email: newEmail });

                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!newEmail || !emailRegex.test(newEmail)) {
                        setShowHelperReg(true);
                      } else {
                        setShowHelperReg(false);
                      }
                    }}
                    error={showHelperReg}
                    label="Email Address *"
                  />

                  <TextField
                    label="Password*"
                    type="password"
                    onChange={(e) => {
                      const newPassword = e.target.value;
                      setValues({ ...values, password: newPassword });
                      if (!newPassword || newPassword.length <= 7) {
                        setShowPassHelper(true);
                      } else {
                        setShowPassHelper(false);
                      }
                    }}
                    helperText={
                      showPassHelper
                        ? "Please Enter atleast 8 character password"
                        : ""
                    }
                    error={showPassHelper}
                    onFocus={() => setShowPassHelper(false)}
                    onBlur={() => {
                      if (!values.password || values.password.length <= 7) {
                        setShowPassHelper(true);
                      }
                    }}
                  />
                  <TextField
                    label="Confirm Password*"
                    type="password"
                    onChange={(e) => {
                      const cpass = e.target.value;
                      const pass = values.password; // current password value
                      setValues((prevValues) => ({
                        ...prevValues,
                        cpassword: cpass,
                      }));

                      if (!cpass || pass !== cpass) {
                        setShowCpassHelper(true);
                      } else {
                        setShowCpassHelper(false);
                      }
                    }}
                    onFocus={() => setShowCpassHelper(false)}
                    helperText={
                      showCpassHelper
                        ? "This must match the password entered above"
                        : ""
                    }
                    error={showCpassHelper}
                  />
                  <TextField
                    label="Full Address*"
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, address: e.target.value })
                    }
                    helperText={
                      showAddressHelper ? "Please Enter your Full Address" : ""
                    }
                    onFocus={() => setShowAddressHelper(false)}
                    error={showAddressHelper}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" error={showGenderHelper}>
                      Gender*
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender*"
                      onChange={(e: SelectChangeEvent<string>) =>
                        {
                          setShowGenderHelper(false)
                          setValues({ ...values, gender: e.target.value })}
                      }
                      error={showGenderHelper}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    {showGenderHelper && (
                      <FormHelperText sx={{color: "red"}}>
                        Please select your gender
                      </FormHelperText>
                    )}
                  </FormControl>
                  <TextField
                    label="Mobile No*"
                    type="text"
                    onChange={(e) =>
                      setValues({ ...values, mobile: e.target.value })
                    }
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault(); // Block if not a number
                      }
                    }}
                    onFocus={() => setShowMobileHelper(false)}
                    helperText={
                      showMobileHelper ? "Please Enter your mobile number" : ""
                    }
                    error={showMobileHelper}
                  />
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setOpenRegister(false);
                    setShowHelperReg(false);
                    setShowNameHelper(false);
                    setShowPassHelper(false);
                    setShowCpassHelper(false);
                    setShowAddressHelper(false);
                    setShowMobileHelper(false);
                  }}
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
