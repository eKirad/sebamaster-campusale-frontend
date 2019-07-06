// React imports
import React from 'react';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: 8,
      flex: 1,
      height: 10
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  });
export const Search = ({ onFilter }) => {
    const classes = useStyles();    

    // Will be used to fire the filter event after a certain amount of time (setTimeout())
    const handleChange = (event) => {
        // TODO
    }

    const handleKeyDown = (event) => {
        console.log(event.key);
        if (event.key === 'Enter') {
            // Fire the filter
            console.log(`You entered: ${event.key}`);
            console.log(`Fire the filter with: ${event.target.value}`)
            onFilter(event.target.value);
        }
    }

      return (
        <Paper className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} />
          <InputBase
            className={classes.input}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'Search Google Maps' }}
            onKeyDown = {handleKeyDown}
          />
        </Paper>
      );
}