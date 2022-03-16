import React, { useEffect, useState, useMemo } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import { Container, Switch, CssBaseline, adaptV4Theme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {
  useTheme,
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function DatkModeButton() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
        size="large"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInSuccess, setLoginSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLiked, setIsLiked] = useState("");
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme(
        adaptV4Theme({
          palette: {
            mode,
          },
        })
      ),
    [mode]
  );

  useEffect(() => {
    axios
      .get("api/accounts/profile/")
      .then((response) => {
        console.log("Du er logget inn!");
        setLoggedIn(true);
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log(error.response);
        console.log("Du er IKKE logget inn");
        setLoggedIn(false);
        setCurrentUser(null);
      });
  }, []);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <UserContext.Provider
              value={{
                loggedIn,
                setLoggedIn,
                logInSuccess,
                setLoginSuccess,
                setCurrentUser,
                currentUser,
                isLiked,
                setIsLiked,
              }}
            >
              <DatkModeButton />
              <CssBaseline />
              <HomePage />
            </UserContext.Provider>
          </ThemeProvider>
        </StyledEngineProvider>
      </ColorModeContext.Provider>
    </>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
