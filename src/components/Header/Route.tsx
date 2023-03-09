import React, { useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
];

function RouteInLargeScreen() {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        borderRadius: 2,
      }}
      border="1px solid"
      borderColor="divider"
    >
      {routes.map((route, i) => (
        <Link key={i} to={route.path}>
          <Button sx={{ display: "block" }}>{route.name}</Button>
        </Link>
      ))}
    </Box>
  );
}

function RouteInSmallScreen() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {routes.map((route, i) => (
          <Link key={i} to={route.path}>
            <MenuItem onClick={handleCloseNavMenu}>{route.name}</MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
}

export { RouteInLargeScreen, RouteInSmallScreen };
