// React imports
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Component imports
import {SimpleLink} from './SimpleLink';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const handleLogin = () => {
    console.log(`Logged in`);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CampuSale
          </Typography>
          <Button color = "inherit" component={Link} to= {`/login`}>
            Login
          </Button>
          <Button color = "inherit" component={Link} to= {`/signup`}>
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}