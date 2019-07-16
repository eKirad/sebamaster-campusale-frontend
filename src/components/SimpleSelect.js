// Default imports
import React, { useState } from 'react';

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

export const SimpleSelect = ({data, defaultValue, onSelect}) => {
    const classes = useStyles();
    const [ values, setValues ] = useState({
        name: ``
    })

    const handleChange = (event) => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
          }));
          onSelect(event.target);
    }

    console.log(`THE DATA`)
    console.log(data)
    return(
        <form>
            <FormControl className = {classes.formControl}>
                <InputLabel htmlFor = "select-simple">
                    {data.label}
                </InputLabel>
                <Select
                    // defaultValue={defaultValue}
                    value = {values.name}
                    onChange = {handleChange}
                    disabled = {data.isDisabled}
                    inputProps = {{
                        name: `name`,
                        id: `simple-select`
                    }}
                >
                    {data.data.map(selectOption => (
                        <MenuItem key={selectOption._id} value={selectOption._id}>
                            {selectOption.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </form>
    );
}