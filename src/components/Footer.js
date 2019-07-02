// React impports
import React from 'react';
import { Link } from 'react-router-dom'

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';


// Component imports
import {StyledLink} from './StyledLink';


const useStyles = makeStyles(theme => ({
    appBar: {
      top: 'auto',
      bottom: 0,
      backgroundColor: "#5308D6"
    },
    grow: {
      flexGrow: 1,
    },
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <React.Fragment>
          <CssBaseline />
          <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
              <div className={classes.grow} >
                <StyledLink>
                  About CampuSale
                </StyledLink>
                <StyledLink>
                  Help & Contact
                </StyledLink>
                <StyledLink>
                  Sitemap
                </StyledLink>
              </div>
              <span>
                Copyright 2019 CampuSale. All rights reserved.
              </span>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      );

}