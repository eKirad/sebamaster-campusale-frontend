// React imports
import React, { useState } from 'react';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: 'theme.palette.background.paper',
    },
}));

export const CheckboxList = ({ partners, onSelectPartner}) => {
    const classes = useStyles();
    const [checkedPartner, setCheckedPartner] = useState([ ]);

    const handleToggle = (partner) => () => {
        
        const setNewCheckedPartner = (partner) => {
            const newCheckedPartner = [ ];
            newCheckedPartner.push(partner);
            setCheckedPartner(newCheckedPartner);
            onSelectPartner(newCheckedPartner);
        }

        if (checkedPartner.length !== 0) {            
            if (checkedPartner[0]._id === partner._id) {
                setCheckedPartner([ ]);
                onSelectPartner([ ]);
            } else {
                setNewCheckedPartner(partner);
            }
        } else {
            setNewCheckedPartner(partner);
        }
    };

    const handleSelectAll = () => {
        const newCheckedPartners = [ ];
        partners.forEach(partner => {
            newCheckedPartners.push(partner);
        });
        
        setCheckedPartners(newCheckedPartners);
        onSelectPartner(newCheckedPartners);
    }

    const handleClear = () => {
        console.log(`Inside handleClear()`)
        setCheckedPartners([ ]);
        console.log(newCheckedPartners);
        onSelectPartner(newCheckedPartners);
    }

    return (
        <List className={classes.root}>
          {partners.map(partner => {
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

