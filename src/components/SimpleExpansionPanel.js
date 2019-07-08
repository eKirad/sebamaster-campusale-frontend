// React imports
import React, { useState } from 'react';

// Material UI imports
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'


// Component imports
import {CheckboxList} from './CheckboxList';


const useStyles = makeStyles(theme => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

export const SimpleExpansionPanel = ({ title, usage, partners, onSelectPartner, singlePartner }) => {
    const classes = useStyles();
    

    if (usage === `filter`) {
        return(
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon = {<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                >
                    <Typography className={classes.heading}>
                        {title}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                       <CheckboxList 
                        partners = {partners}
                        onSelectPartner = {((selectedPartner) => onSelectPartner(selectedPartner))}
                        />
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    } else {
        return(
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon = {<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                >
                    <Typography className={classes.heading}>
                        {title}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        <p>id: {singlePartner._id}</p>
                        <p>location: {singlePartner.location}</p>
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }


}