// React imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// Material UI imports
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

// Component imports
import {StyledLink} from './StyledLink';

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
  },
  menuList: {
      textAlign: 'center'
  }
}));

// make this class and check
export const AuthorizedHeader = ({ user, onLogout }) => {
    const classes = useStyles();
    const [ accountButton, setAccountButton ] = useState(null);

    const handleShowAccountMenu = (event) => {
        setAccountButton(event.target);
    }
    
    const handleHideAccountMenu = () => {
        setAccountButton(null);
    }
    
    const menuListStyle = {
        align: 'center',
        alignContent: 'center',
    }


    const handleLogout = () => {
        // onLogout();
        UserService.logout();
        if(this.props.location.pathname != '/') {
            this.props.history.push('/');
        }
        else {
            console.log('yes')
            window.location.reload();
        }
    }

  return (
    <div className={classes.root} >
        <AppBar position="static" className = {classes.toolbar}>
            <Toolbar className = {classes.toolbar}>
                <IconButton color="inherit" >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                <StyledLink
                    to = {'/'}
                >
                    CampuSale
                </StyledLink>
                </Typography>
                <span>
                    <IconButton 
                        color = "inherit"
                        onClick = {handleShowAccountMenu}> 
                        <UserIcon/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl = {accountButton}
                        keepMounted
                        open = {Boolean(accountButton)}
                        onClose = {handleHideAccountMenu}
                    >
                        <MenuList className = {classes.menuList}>
                            <b>{user.username}</b>
                        </MenuList>
                        <MenuItem 
                            component = {Link} 
                            to = {`/profile/${user.id}`}>
                            <ListItemIcon>
                                <UserIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Profile
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick = {handleHideAccountMenu}>
                        <ListItemIcon>
                            <FavIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Wishlist
                        </ListItemText>
                        </MenuItem>
                        <MenuItem onClick = {handleHideAccountMenu}>
                            <ListItemIcon>
                                <SignoutIcon/>
                            </ListItemIcon>
                            <ListItemText onClick = {handleLogout}>
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

// default withRouter(AuthorizedHeader);