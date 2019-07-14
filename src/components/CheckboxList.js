// React imports
import React, { useState } from 'react';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'theme.palette.background.paper',
    },
}));

export const CheckboxList = ({ data, onSelectData}) => {
    const classes = useStyles();
    const [checkedPartner, setCheckedPartner] = useState([ ]);

    const handleToggle = (partner) => () => {
        const setNewCheckedPartner = (partner) => {
            const newCheckedPartner = [ ];
            newCheckedPartner.push(partner);
            setCheckedPartner(newCheckedPartner);
            onSelectData(newCheckedPartner[0]);
        }

        if (checkedPartner.length !== 0) {            
            if (checkedPartner[0]._id === partner._id) {
                setCheckedPartner([ ]);
                onSelectData(null);
            } else {
                setNewCheckedPartner(partner);
            }
        } else {
            setNewCheckedPartner(partner);
        }
    };

    return (
        <List className={classes.root}>
          {data.map(partner => {
            const labelId = `checkbox-list-label-${partner._id}`;
            return (
              <ListItem 
                key = {partner._id} 
                role = {undefined} 
                dense button onClick = {handleToggle(partner)}>
                <ListItemIcon>
                  <Checkbox
                    edge = "start"
                    color = "primary"
                    checked = {checkedPartner.indexOf(partner) !== -1}
                    // tabIndex = {-1}
                    disableRipple
                    inputProps = {{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText 
                    id = {labelId} 
                    primary = {`${partner.name}`} />
              </ListItem>
            );
          })}
        </List>
      );
}

