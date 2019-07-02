// React imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import Styled from 'styled-components';

// Component imports

// Service imports
import UserService from '../services/UserService';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    menuButtonHovered: {
        marginRight: theme.spacing(2),
        color: "#50ECE2"
    },
    headerButtonHovered : {
        color: "#50ECE2"
    },
    headerButton: {
        color: "inherit"
    },
    title: {
      flexGrow: 1,
    },
    toolbar: {
        // backgroundColor: "#636468"
        backgroundColor: "#5308D6"
    }
  }));


export default function ButtonAppBar() {
  const classes = useStyles();
  const [ menuButtonHover, setMenuButtonHover ] = useState(false);
  const [ loginButtonHover, setLoginButtonHover ] = useState(false);
  const [ signupButtonHover, setSignupButtonHover ] = useState(false);
  const authenticatedUser = () => UserService.isAutehnticated() ? 
    UserService.getCurrentUser() : undefined;
  
  const [ user, setUser ] = useState(authenticatedUser())

  const [ accountButton, setAccountButton ] = useState(null);


  const toggleMenuButtonHover = () => setMenuButtonHover(!menuButtonHover);
  const toggleLoginButtonHover = () => setLoginButtonHover(!loginButtonHover);
  const toggleSignupButtonHover = () => setSignupButtonHover(!signupButtonHover);

  const handleShowAccount = (event) => {
    setAccountButton(event.currentTarget);
  }

  const handleCloseAccount = () => {
    setAccountButton(null);
  }

  const handleLogin = () => {
    console.log(`Logged in`);
  }

  const handleMouseOver = () => {
    console.log('hover')
  }

  return (
    <div className={classes.root} >
      <AppBar position="static" className = {classes.toolbar}>
        <Toolbar className = { classes.toolbar }>
          <IconButton 
            edge="start" 
            className={ menuButtonHover ? classes.menuButtonHovered : classes.menuButton } 
            color="inherit" 
            aria-label="Menu"
            onMouseOver = { toggleMenuButtonHover }
            onMouseLeave = { toggleMenuButtonHover }
            >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CampuSale
          </Typography>
          <Button 
            className = { signupButtonHover ? classes.headerButtonHovered : classes.headerButton }
            onMouseOver = { toggleSignupButtonHover }
            onMouseLeave = { toggleSignupButtonHover }
            component = { Link } 
            to= {`/signup`}>
                Signup
          </Button>
          <span>
          <Button 
            className = { loginButtonHover ? classes.headerButtonHovered : classes.headerButton }
            onMouseOver = { toggleLoginButtonHover }
            onMouseLeave = { toggleLoginButtonHover }
            component={Link} 
            to= {`/login`}>
              Login
          </Button>
          </span>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}