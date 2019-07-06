// React imports
import React from 'react';

// Material UI imports
import Grid from '@material-ui/core/Grid';

// Component imports
import { SimpleSelect } from './SimpleSelect';
import {Category} from './Category';
import RangeSlider from './RangeSlider';

export const Filter = ({ categories, onSelectedCategory}) => {
	const linkStyle = {
		padding: '30px',
	}	

    return(
        <Grid>
            <p>Filter</p>
            <Grid item xs = {10}>
            <Category 
                categories = {categories}
                onSelectedCategory = {(selectedCategory) => onSelectedCategory(selectedCategory)}    
            />
            </Grid>
            <Grid item xs = {10}
            style = {linkStyle}>
                <RangeSlider
                />
            </Grid>
        </Grid>
    );
};