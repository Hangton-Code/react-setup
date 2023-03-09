import React from "react";
import { AppBar, Toolbar, Box, Button, useTheme } from "@mui/material";
import { useAuth, useAuthController } from "../../contexts/Auth";
import ToggleThemButton from "./ToggleThemButton";
import { AppNameInLargeScreen, AppNameInSmallScreen } from "./AppName";
import { RouteInLargeScreen, RouteInSmallScreen } from "./Route";
import UserAvatar from "./UserAvatar";
import hexRgb from "hex-rgb";

function Header() {
  const { palette } = useTheme();
  const { authState } = useAuth();
  const { logIn } = useAuthController();

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: hexRgb(palette.background.default, {
          format: "css",
          alpha: 0.7,
        }),
        backdropFilter: "blur(8px)",
        color: "primary.main",
        boxShadow: "none",
        borderBottom: `1px solid`,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          // bgcolor: "transparent",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* App Name in Large Screen */}
          <AppNameInLargeScreen />
          {/* Route Menu in Small Screen */}
          <RouteInSmallScreen />
          {/* App Name in Small Screen */}
          <AppNameInSmallScreen />
          {/* Route Menu in Large Screen */}
          <RouteInLargeScreen />
        </Box>

        {/* Button Group */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <ToggleThemButton />
          {/* User Avatar */}
          {authState !== "loading" ? (
            <>
              {authState === "authed" ? (
                <UserAvatar />
              ) : (
                <Button variant="outlined" onClick={logIn}>
                  Log In
                </Button>
              )}
            </>
          ) : (
            <></>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
