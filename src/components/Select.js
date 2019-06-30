// Default imports
import React from 'react';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

export const SimpleSelect = ({ categories }) => {

    const classes = useStyles();
    const [values, setValues] = React.useState({
        category: ''
      });

      const handleChange = (event) => {
        console.log(event.target);
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
          }));
    }

    return (
        <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category-simple">Category</InputLabel>
                <Select
                    value={values.category}
                    onChange={handleChange}
                    inputProps={{
                        name: 'category',
                        id: 'category-simple',
                      }}
                >
                    {categories.map(category => (
                        <MenuItem key={category._id} value={category._id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </form>
    );  
}