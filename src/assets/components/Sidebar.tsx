// Sidebar.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from '@mui/icons-material/People';

const Sidebar = () => {
  const [drawerWidth, setDrawerWidth] = useState(200);

  const handleSidebar = () => {
    setDrawerWidth((prev) => (prev === 200 ? 100 : 200));
  };

  const dashboardItem = () => {
    if (drawerWidth === 200) {
      return (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <Box display="flex" alignItems="center">
                <DashboardIcon sx={{ marginRight: "5px" }} />
                <ListItemText primary="Dashboard" />
              </Box>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/view-users">
              <Box display="flex" alignItems="center">
                <PeopleIcon sx={{ marginRight: "5px" }} />
                <ListItemText primary="View Users" />
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      );
    } else {
      return (
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <Box display="flex" alignItems="center">
                <DashboardIcon sx={{ marginRight: "5px", fontSize: "40px" }} />
              </Box>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/view-users">
              <Box display="flex" alignItems="center">
                <PeopleIcon sx={{ marginRight: "5px", fontSize: "40px" }} />
              </Box>
            </ListItemButton>
          </ListItem>
        </List>
      );
    }
  };
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#DAE3FF",
        },
      }}
    >
      <Toolbar>
        <IconButton
          sx={{
            marginLeft: "65%",
            border: "1px solid black",
            position: "relative",
          }}
          onClick={handleSidebar}
        >
          <ChevronRightIcon />
        </IconButton>
      </Toolbar>
      {dashboardItem()}
    </Drawer>
  );
};

export default Sidebar;
