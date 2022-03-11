import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link as LinkDom } from "react-router-dom";

//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { height, maxHeight } from "@mui/system";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import { LoggedIn } from "./LoggedIn";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
      >
        Foodshare
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    loggedIn,
    setLoggedIn,
    logInSuccess,
    setLoginSuccess,
    setCurrentUser,
    currentUser,
    isLiked,
    setIsLiked,
  } = useContext(UserContext);

  const [logInFailed, setLoginFailed] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //let formData = new FormData();

    axios
      .post("/api/accounts/login/", {
        login: username,
        password: password,
      })
      .then(
        (response) => {
          console.log(response);
          console.log("Login Success");
          setLoggedIn(true);
          setLoginSuccess(true);

          // Når man logger inn henter man brukernavnet
          // Sikkert en annen måte å gjøre det på, men funker ig :D
          axios
            .get("api/accounts/profile/")
            .then((response) => {
              console.log(response.data);
              setCurrentUser(response.data);
            })
            .catch((error) => {
              console.log(error.response);
            });
        },
        (error) => {
          console.log(error);
          console.log("failed login");
          setLoginFailed(true);
        }
      );
  };

  useEffect(() => {
    axios
      .get("api/accounts/profile/")
      .then((response) => {
        setLoginSuccess(true);
      })
      .catch((error) => {
        setLoginSuccess(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://foodish-api.herokuapp.com/api/")
      .then((response) => {
        console.log(response.data.image);
        setImageUrl(response.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {logInSuccess ? (
        <LoggedIn />
      ) : (
        <LoginContainer>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
                //filter: "blur(1px)",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <LoginStatus>{logInFailed ? "Try again" : ""}</LoginStatus>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <LinkDom to="/register">
                        <Link variant="body2">Forgot password?</Link>
                      </LinkDom>
                    </Grid>
                    <Grid item>
                      <LinkDom to="/register">
                        <Link variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </LinkDom>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </LoginContainer>
      )}
    </>
  );
}

const LoginStatus = styled.div`
  color: red;
  padding: 5px;
`;
const LoginContainer = styled.div`
  overflow: hidden;
`;
