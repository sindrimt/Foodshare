import { TextField, Button } from "@material-ui/core";

import React from "react";

export const LoginPage = () => {
  return (
    <div className="outer">
      <div className="inner">
        Log In
        <TextField id="outlined-basic" label="Username" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <Button variant="contained">Submit</Button>
      </div>
    </div>
  );
};
