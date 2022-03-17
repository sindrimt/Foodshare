import React, { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { ColorModeContext } from "../context/ColorModeContext";
import { Button } from "@mui/material";

export default function DarkModeButton() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <Button
      variant="contained"
      onClick={colorMode.toggleColorMode}
      startIcon={
        theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )
      }
    >
      Switch theme
    </Button>
  );
}
