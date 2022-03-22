import React, { useEffect, useState, useMemo } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import { ColorModeContext } from "../context/ColorModeContext";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [logInSuccess, setLoginSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLiked, setIsLiked] = useState("");
  const [deletedPost, setDeletedPost] = useState(true);
  const [isDeleted, setIsDeleted] = useState("");
  const [mode, setMode] = useState("light");

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
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode !== null) {
      //in ["light", "dark"]) {
      setMode(storedMode);
    }
  }, []);

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
                deletedPost,
                setDeletedPost,
                isDeleted,
                setIsDeleted,
              }}
            >
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
