import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Stack spacing={2} alignItems="center">
    <Typography variant="h3">404: Not found.</Typography>
    <Typography variant="h4">This page does not exist.</Typography>
    <Button color="primary" variant="contained" to="/" component={Link}>
      Go home
    </Button>
  </Stack>
);

export default NotFound;
