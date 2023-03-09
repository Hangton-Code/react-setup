import React, { ReactNode, useState, createContext, useContext } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  PaletteMode,
  colors,
} from "@mui/material";

const ThemeContext = createContext({
  themeMode: "dark" as PaletteMode,
  setDarkMode: () => {},
  setLightMode: () => {},
});

type ContextProp = {
  children: ReactNode;
};

function ThemeProvider({ children }: ContextProp) {
  const [themeMode, setThemeMode] = useState<PaletteMode>(
    (localStorage.getItem("themeMode") as PaletteMode) || "dark"
  );

  const setDarkMode = () => {
    localStorage.setItem("themeMode", "dark");
    setThemeMode("dark");
  };
  const setLightMode = () => {
    localStorage.setItem("themeMode", "light");
    setThemeMode("light");
  };

  const isDarkMode = themeMode === "dark";

  let theme = createTheme({
    palette: {
      mode: themeMode,
      // border: isDarkMode ? "rgba(194, 224, 255, 0.08)" : colors.grey[300],
      background: {
        default: isDarkMode ? "#0A1929" : "#fff",
        paper: isDarkMode ? "#121212" : "#fff",
      },
    },
    typography(palette) {
      return {
        highLighted1: {
          color: palette.primary.dark,
          fontWeight: 500,
          padding: "4px 1rem",
          borderRadius: "4px",
          border: `1px solid`,
          borderColor: palette.divider,
          width: "fit-content",
        },
      };
    },
    components: {
      MuiIconButton: {
        defaultProps: {
          color: "primary",
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setDarkMode,
        setLightMode,
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

function useThemeController() {
  return useContext(ThemeContext);
}

export default ThemeProvider;
export { useThemeController };
