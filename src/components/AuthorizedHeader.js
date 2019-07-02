import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserIcon from '@material-ui/icons/AccountCircle';
import FavIcon from '@material-ui/icons/Favorite';
import SignoutIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList'

import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


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
  },
  menuList: {
      textAlign: 'center'
  }
}));

export default function AuthorizedHeader(myUsername) {
    console.log(`Inside AuthorizedHeader`)
    console.log(myUsername);
    const classes = useStyles();
    const [ accountButton, setAccountButton ] = useState(null);

    const handleShowAccountMenu = (event) => {
        console.log(`Clicked!`);
        console.log(event.target)
        setAccountButton(event.target);
    }
    
    const handleHideAccountMenu = () => {
        setAccountButton(null);
    }
    
    const menuListStyle = {
        align: 'center',
        alignContent: 'center',
    }

  return (
    <div className={classes.root} >
      <AppBar position="static" className = {classes.toolbar}>
        <Toolbar className = { classes.toolbar }>
          <IconButton 
            edge="start" 
            // className={ menuButtonHover ? classes.menuButtonHovered : classes.menuButton } 
            color="inherit" 
            aria-label="Menu"
            onClick = { handleShowAccountMenu }
            // onMouseOver = { toggleMenuButtonHover }
            // onMouseLeave = { toggleMenuButtonHover }
            >
           
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CampuSale
          </Typography>
          <span>
          <IconButton onClick = { handleShowAccountMenu }> 
            <UserIcon/>
          </IconButton>
          <Menu
                id="simple-menu"
                anchorEl = {accountButton}
                keepMounted
                open = { Boolean(accountButton) }
                onClose = { handleHideAccountMenu }
                
            >
                <MenuList className = { classes.menuList }>
                <b>{myUsername.myUsername}</b>
                </MenuList>
                <MenuItem >
                    <ListItemIcon>
                        <UserIcon></UserIcon>
                    </ListItemIcon>
                    <ListItemText>
                        Profile
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick = {handleHideAccountMenu}>
                    <ListItemIcon>
                        <FavIcon></FavIcon>
                    </ListItemIcon>
                    <ListItemText>
                        Wishlist
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick = {handleHideAccountMenu}>
                    <ListItemIcon>
                        <SignoutIcon></SignoutIcon>
                    </ListItemIcon>
                    <ListItemText>
                        Sign out
                    </ListItemText>
                </MenuItem>
            </Menu>
          </span>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}