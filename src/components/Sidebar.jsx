import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import {
  Home,
  ShoppingCart,
  Favorite,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const menuItems = [
  { text: "Home", icon: <Home /> },
  { text: "Cart", icon: <ShoppingCart /> },
  { text: "Favorites", icon: <Favorite /> },
  { text: "Settings", icon: <Settings /> },
];

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Mobile screen detection
  const [open, setOpen] = useState(!isMobile); // Open by default on larger screens

  const drawerWidth = isMobile ? 150 : 300;

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Paper sx={{ minHeight: "100vh" }}>
      <Box sx={{ display: "flex" }}>
        {/* App Bar */}

        {/* Drawer */}
        <Drawer
          variant={"permanent"} // Temporary on mobile, permanent on desktop
          open={open}
          onClose={handleDrawerToggle} // Close drawer on mobile when clicking outside
          sx={{
            width: open ? drawerWidth : 56,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : 56,
              boxSizing: "border-box",
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              marginTop: "74px", // Adjust margin to account for app bar height
              marginLeft: isMobile ? 0 : "56px", // Adjust margin for mobile
              height: "calc(100vh - 64px)", // Adjust height to fit below app bar
            },
          }}
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography variant="h6" noWrap>
              {open ? "My App" : ""}
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Box>
          <Divider />

          {/* Menu Items */}
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: isMobile ? 0 : 8, // Adjust margin for mobile
            marginTop: "64px", // Adjust margin to account for app bar height
            transition: theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          {/* Page Content */}
          <Outlet />
        </Box>
      </Box>
    </Paper>
  );
}

export default Sidebar;
