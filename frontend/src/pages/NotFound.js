import React from "react";
import Button from "@material-ui/core/Button";
import Stack from "@mui/material/Stack";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Stack spacing={2} alignItems="center">
    <Typography variant="h3">404: Not found.</Typography>
    <Typography variant="h4">Such is life.</Typography>

    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>

    <Stack spacing={2} direction="row">
      <Button
        color="secondary"
        variant="contained"
        href="https://www.youtube.com/embed/enh2iYbcYjs?fs=1"
      >
        Go on an adventure
      </Button>
      <Button color="primary" variant="contained" to="/" component={Link}>
        Go home
      </Button>
    </Stack>
  </Stack>
);

export default NotFound;
