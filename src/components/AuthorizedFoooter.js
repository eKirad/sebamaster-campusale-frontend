// React impports
import React from 'react';
import { Link } from 'react-router-dom'

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

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


export const AuthorizedFooter = ({ user, props }) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const handleClickOpen = () => {
        setOpen(true);
      }
    
    const handleClose = () => {
        setOpen(false);
        // props.history to re-render the ItemListFilterView component
    }

    return(
        <React.Fragment>
          <CssBaseline />
          <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
              <div className={classes.grow} >
                <StyledLink
                    onClick = {handleClickOpen}
                >
                    About CampuSale
                </StyledLink>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {`CampuSale`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <b>CampuSale</b> is a platform that helps students find and filter different 
                                items and local base services in Munich with student discounts. 
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick = {handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <StyledLink>
                  Help & Contact
                </StyledLink>
                <StyledLink>
                  Sitemap
                </StyledLink>
              </div>
              <span>
                Copyright ©2019 CampuSale. All rights reserved.
              </span>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      );

}