// React impports
import React, { useState }from 'react';

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
import Typography from '@material-ui/core/Typography';

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

export const Footer = ({ props, user }) => {
    const classes = useStyles();
    const [openAboutCampuSaleDialog, setOpenAboutCampuSaleDialog] = React.useState(false);
    const [openHelpAndContactDialog, setOpenHelpAndContactDialog] = React.useState(false);
    

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const handleOpenAboutCampuSale = () => {
        setOpenAboutCampuSaleDialog(true);
    }
    
    const handleOpenHelpAndContactDialog = () => {
        setOpenHelpAndContactDialog(true);
    }


    const handleClose = () => {
        setOpenAboutCampuSaleDialog(false);
        if(props.props.location.pathname != '/') {
            props.props.history.push('/');
        }
        else {
            window.location.reload();
        }
    }

    return(
        <React.Fragment>
          <CssBaseline />
          <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
              <div className={classes.grow} >
                <StyledLink onClick = {handleOpenAboutCampuSale}>
                    About CampuSale
                </StyledLink>
                <Dialog
                    open={openAboutCampuSaleDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-about-campuSale-dialog-slide-title">
                        {`CampuSale`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-about-campuSale-dialog-slide-description">
                            <Typography>
                                <Typography>
                                    <b>CampuSale</b> is a platform that helps students find and filter different 
                                    items and local base services in Munich with student discounts. 
                                </Typography>
                                <p>
                                    <Typography>
                                        It is part of the SEBIS chair's course Web Application Engineering at
                                        Technical University of Munich.
                                    </Typography>
                                </p>
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick = {handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <StyledLink onClick={handleOpenHelpAndContactDialog}>
                  Help & Contact
                </StyledLink>
                <Dialog
                    open={openHelpAndContactDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-about-campuSale-dialog-slide-title">
                        {`Help and contact`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-about-campuSale-dialog-slide-description">
                            <Typography>
                                <Typography>
                                    Please contact us at <b>contact@campusale.de</b>
                                </Typography>
                            </Typography>
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
                  Sitemap
                </StyledLink>
                    { !user ? 
                        <StyledLink to = {'/become-partner'}> 
                            Become a partner 
                        </StyledLink> 
                    : null}
              </div>
              <span>
                Copyright ©2019 CampuSale. All rights reserved.
              </span>
            </Toolbar>
          </AppBar>
        </React.Fragment>
      );

}