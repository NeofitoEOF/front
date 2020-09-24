import React from 'react';

import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import {Menu} from '@material-ui/icons';


export const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton color="inherit">
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}