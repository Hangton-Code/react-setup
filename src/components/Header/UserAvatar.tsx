import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthController } from "../../contexts/Auth";
import { useUser } from "../../contexts/User";

function UserAvatar() {
  const { logOut } = useAuthController();
  const { profile } = useUser();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <Tooltip title={profile?.name}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt=""
            src={profile?.picture}
            imgProps={{
              referrerPolicy: "no-referrer",
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Link to="/setting">
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Setting</Typography>
          </MenuItem>
        </Link>

        <MenuItem
          onClick={() => {
            logOut();
            handleCloseUserMenu();
          }}
        >
          <Typography textAlign="center">Log Out</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserAvatar;
