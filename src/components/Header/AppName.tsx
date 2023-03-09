import { Tooltip, Typography } from "@mui/material";
import React from "react";

const AppName = "App Name";

function AppNameInLargeScreen() {
  return (
    <Tooltip title="refresh">
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          display: { xs: "none", md: "flex" },
          mr: 4,
        }}
        fontWeight={900}
        color="primary.dark"
      >
        {AppName}
      </Typography>
    </Tooltip>
  );
}

function AppNameInSmallScreen() {
  return (
    <Tooltip title="refresh">
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
        }}
        align="left"
        fontWeight={900}
        color="primary.dark"
      >
        {AppName}
      </Typography>
    </Tooltip>
  );
}

export { AppNameInLargeScreen, AppNameInSmallScreen };
