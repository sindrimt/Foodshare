import React, { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../context/ColorModeContext";
import { IconButton, Tooltip } from "@mui/material";

export default function DarkModeButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Tooltip
      title={`Switch to ${
        theme.palette.mode === "light" ? "dark" : "light"
      } mode`}
    >
      {/* <Button
        variant="contained"

        startIcon={
          theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )
        }
      ></Button> */}
      <IconButton
        onClick={() => {
          colorMode.toggleColorMode();
          localStorage.setItem(
            "mode",
            theme.palette.mode === "light" ? "dark" : "light"
          );
        }}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Tooltip>
  );
}
