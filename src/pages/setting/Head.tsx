import { Box, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useUser } from "../../contexts/User";

function Head() {
  const { profile } = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 2, md: 6 },
      }}
    >
      <img
        src={profile?.picture}
        loading="lazy"
        alt=""
        style={{
          width: "9rem",
          aspectRatio: "1 / 1",
          borderRadius: "9999px",
        }}
        referrerPolicy="no-referrer"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
          gap: 1,
        }}
      >
        <Tooltip title="name">
          <Typography variant="h5">{profile?.name}</Typography>
        </Tooltip>
        <Tooltip title="email">
          <Typography fontSize={14} variant="highLighted1">
            {profile?.email}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Head;
