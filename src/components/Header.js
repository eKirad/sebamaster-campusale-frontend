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
import UserIcon from '@material-ui/icons/AccountCircle';
import AdminUserIcon from '@material-ui/icons/SupervisedUserCircle'
import PartnerIcon from '@material-ui/icons/Work'
import FavIcon from '@material-ui/icons/Favorite';
import SignoutIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/AddCircle';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

// Component imports
import { StyledLink } from './StyledLink';
import { Search } from './Search';

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
    menuList: {
        textAlign: 'center'},
    toolbar: {
        // backgroundColor: "#636468"
        // backgroundColor: "#7288FF"
        backgroundColor: "#5308D6"
    }
  }));

export default function ButtonAppBar({ props, user, onFiltered }) {
    const classes = useStyles();
    const [ accountButton, setAccountButton ] = useState(null);

    const handleShowAccountMenu = (event) => {
        setAccountButton(event.target);
    }
  
    const handleHideAccountMenu = () => {
        setAccountButton(null);
    }

    const onFilter = (filterCriteria) => {
        onFiltered(filterCriteria);
    }
  

    const handleLogout = () => {
        UserService.logout();
        console.log(props)
        if(props.props.location.pathname != '/') {
            props.props.history.push('/');
            window.location.reload();
        } else {
            window.location.reload();
        }
    }


    let userTypeJSX;
    if (user) {
        if (user.role === `admin`) {
            userTypeJSX = 
                <span>
                    <IconButton 
                        color = "inherit"
                        onClick = {handleShowAccountMenu}> 
                        <AdminUserIcon/>
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
                        <MenuItem 
                            component = {Link} 
                            to = {`/partner-dashboard`}>
                            <ListItemIcon>
                                <PartnerIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Partner dashboard
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick = {handleLogout}>
                            <ListItemIcon>
                                <SignoutIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Sign out
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                </span> 
        } else if (user.role === `partner`) {
            userTypeJSX = 
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
                        <MenuItem 
                            component = {Link} 
                            to = {`/add-item`}>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Add item
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick = {handleLogout}>
                            <ListItemIcon>
                                <SignoutIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Sign out
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                </span> 
        } else {
            userTypeJSX = 
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
                            My wishlist
                        </ListItemText>
                        </MenuItem>
                        <MenuItem onClick = {handleLogout}>
                            <ListItemIcon>
                                <SignoutIcon/>
                            </ListItemIcon>
                            <ListItemText >
                                Sign out
                            </ListItemText>
                        </MenuItem>
                    </Menu>
                </span> 
        }
    } else {
        userTypeJSX = 
            <span>
                <Button 
                    className = {classes.headerButton}
                    component = {Link} 
                    to= {`/signup`}>
                    Signup
                </Button>   
                <Button 
                    className = {classes.headerButton}
                    component = {Link} 
                    to= {`/login`}>
                    Login
                </Button>
            </span>
    }

  return(
    <div className={classes.root} >
      <AppBar position="static" className = {classes.toolbar}>
        <Toolbar className = {classes.toolbar}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Typography variant="h6" className = {classes.title}>
                        <StyledLink to = {'/'}>
                            CampuSale
                        </StyledLink>
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Search onFilter = {(filterCriteria) => onFilter(filterCriteria)}/>
                </Grid>
                <Grid  item xs={2}>
                    {userTypeJSX}
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}