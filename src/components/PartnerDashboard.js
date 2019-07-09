// React imports
import React, { useState } from 'react';

// Component imports
import {SimpleExpansionPanel} from './SimpleExpansionPanel';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    root: {
        width: '100%',
        height: 400,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
  }));


export const PartnerDashboard = ({ partners, onApproveAndRegisterPartner }) => {
    const classes = useStyles();
    const [registerDiaglog, setRegisterDialog] = useState(false);
    const [partnerUser, setPartnerUser] = useState({ });

    const cardStyle = {
        textAlign: 'center'
    }
    const handleApproveAndRegisterPartner = (waitingForApprovalPartner) => {
        console.log(`WAITING FOR APPROVAL PARTNER`)
        console.log(waitingForApprovalPartner);
        onApproveAndRegisterPartner(waitingForApprovalPartner);
    }

    const handleCloseRegisterDialog = () => {
        setRegisterDialog(false);
    }

    const approvedPartners = partners
        .filter((approvedPartner) => approvedPartner.isApproved === true);
    const waitingForApprovalPartners = partners
        .filter((waitingForApprovalPartner) => waitingForApprovalPartner.isApproved === false);

    const handleDeletePartner = (waitingForApprovalPartner) => {
        console.log(`WAITING FOR APPROVAL`)
        console.log(waitingForApprovalPartner);
    }


    const handleChangePartnerUsername = (event) => {
        setPartnerUser({
            ...partnerUser,
            username: event.target.value
        });
    }
    
    const handleChangePartnerPassword = (event) => {
        setPartnerUser({
            ...partnerUser,
            password: event.target.value
        });
    }

    const handleChangePartnerEmail = (event) => {
        setPartnerUser({
            ...partnerUser,
            email: event.target.value,
            role: `partner`
        });
    }

    const handleSubmitPartner = (event, waitingForApprovalPartnerId) => {
        event.preventDefault();
        onRegisterPartner(partnerUser);
    }

    return(
        <Card className = {classes.card}>
            <CardContent>
                <Typography 
                    color = "textPrimary"
                    >
                        Live Partners
                </Typography>
                {approvedPartners.map((approvedPartner) => (
                    <ListItem 
                        key = {approvedPartner._id}
                    >
                        <ListItemText>
                            <SimpleExpansionPanel
                                title = {approvedPartner.name}
                                singlePartner = {approvedPartner}
                            />
                        </ListItemText>
                        <IconButton
                            key = {approvedPartner._id}
                            onClick = {() => handleDeletePartner(approvedPartner)}
                            >
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                ))}
                <Typography 
                    color = "textPrimary"
                    >
                        Partner requests
                </Typography>
                {waitingForApprovalPartners.map((waitingForApprovalPartner) => (
                    <ListItem key = {waitingForApprovalPartner._id}>
                        <ListItemText>
                            <SimpleExpansionPanel
                                title = {waitingForApprovalPartner.name}
                                singlePartner = {waitingForApprovalPartner}
                            />
                        </ListItemText>
                        <IconButton>
                            <CancelIcon/>
                        </IconButton>
                        <IconButton
                            onClick = {() => handleApproveAndRegisterPartner(waitingForApprovalPartner)}
                        >
                            <CheckIcon/>
                        </IconButton>
                        {/* <Dialog
                            open={registerDiaglog}
                            // TransitionComponent={Transition}
                            keepMounted
                            // onClose={handleClose}
                            // aria-labelledby="alert-dialog-slide-title"
                            // aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">
                                {`CampuSale`}
                            </DialogTitle>
                            <DialogContent>
                                <form className="md-grid" onSubmit = {(event) => handleSubmitPartner(event, waitingForApprovalPartner._id)}>
                                    <Card style = {cardStyle}>
                                        <CardContent>
                                            <TextField
                                                label = "Username"
                                                id = "partnerUsernameTextField"
                                                required = {true}
                                                type = "text"
                                                // value = {this.state.username}
                                                onChange = {handleChangePartnerUsername}
                                            /> <br/>
                                            <TextField
                                                label = "Password"
                                                id = "partnerPasswordTextfield"
                                                required = {true}
                                                type = "password"
                                                // value = {this.state.username}
                                                onChange = {handleChangePartnerPassword}
                                            /> <br/>
                                            <TextField
                                                label = "Email"
                                                id = "partnerEmailTextfield"
                                                required = {true}
                                                type = "text"
                                                // value = {waitingForApprovalPartner.contactPersonEmail}
                                                onChange = {handleChangePartnerEmail}
                                            /> <br/>
                                            <Button
                                                id = "submittBtn"
                                                type = "submit"
                                            >
                                                Submit
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </form>
                            </DialogContent>
                        </Dialog> */}
                    </ListItem>
                ))}
            </CardContent>
        </Card>
    );
}