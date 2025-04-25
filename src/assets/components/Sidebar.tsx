// Sidebar.js
import React, { useState } from 'react';
import { Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';



const Sidebar = () => {
    const [drawerWidth, setDrawerWidth] = useState(240);

    const handleSidebar = () => {
        setDrawerWidth(prev => (prev === 240 ? 100 : 240));
    }
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <IconButton sx={{marginLeft: "80%", border: "1px solid black", position: "relative"}} onClick={handleSidebar}>
            <ChevronRightIcon />
        </IconButton>
      </Toolbar>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/view-users">
            <ListItemText primary="View Users" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
