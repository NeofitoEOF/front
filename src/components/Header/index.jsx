import React from "react";

import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

export const Header = ({ title, callback }) => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton onClick={() => callback()} color="inherit">
          <Menu />
        </IconButton>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
};
