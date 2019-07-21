// React imports
import React from 'react';

// Component imports
import { SimpleSelect } from './SimpleSelect';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: "170px",
    },
}));

export const Category = ({categories, onSelect, value}) => {
    const classes = useStyles();
    // Set the AllCategories option to be markable
    categories
        .forEach(category => {
            if (category.name === `All categories` && category.description === `all categories`) {
                category._id = `allCategories`;
            }
        });
    
    const data = {
        isEnabled: true,
        label: `Categories`,
        data: categories
    }

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="discount">
                Category
            </InputLabel>
            <Select
                value={value}
                onChange={onSelect}
                inputProps={{
                    name: `categoryId`,
                    id: `category`
                }}
            >
                {categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};