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


export const PartnerDashboard = ({ partners }) => {
    const classes = useStyles();
    
    const approvedPartners = partners
        .filter((approvedPartner) => approvedPartner.isApproved === true);
    const waitingForApprovalPartners = partners
        .filter((waitingForApprovalPartner) => waitingForApprovalPartner.isApproved === false);

    const handleDeletePartner = (e) => {
        console.log(e.target.key);
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
                    <ListItem>
                        <ListItemText>
                            <SimpleExpansionPanel
                                title = {approvedPartner.name}
                                singlePartner = {approvedPartner}
                            />
                        </ListItemText>
                        <IconButton
                            key = {approvedPartner.id}
                            onClick = {(approvedPartner) => handleDeletePartner(approvedPartner)}
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
                    <ListItem>
                        <ListItemText>
                            <SimpleExpansionPanel
                                title = {waitingForApprovalPartner.name}
                                singlePartner = {waitingForApprovalPartner}
                            />
                        </ListItemText>
                        <IconButton>
                            <CancelIcon/>
                        </IconButton>
                        <IconButton>
                            <CheckIcon/>
                        </IconButton>
                    </ListItem>
                ))}
            </CardContent>
        </Card>
    );
}