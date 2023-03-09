import React from "react";
import { IconButton } from "@mui/material";
import { useThemeController } from "../../contexts/Theme";
import {
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
} from "@mui/icons-material";

function ToggleThemButton() {
  const { themeMode, setDarkMode, setLightMode } = useThemeController();
  return (
    <IconButton onClick={themeMode === "dark" ? setLightMode : setDarkMode}>
      {themeMode === "dark" ? (
        <LightModeOutlinedIcon />
      ) : (
        <DarkModeOutlinedIcon />
      )}
    </IconButton>
  );
}

export default ToggleThemButton;
