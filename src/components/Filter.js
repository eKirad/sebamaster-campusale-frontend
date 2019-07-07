// React imports
import React from 'react';

// Material UI imports
import Grid from '@material-ui/core/Grid';

// Component imports
import { SimpleSelect } from './SimpleSelect';
import {Category} from './Category';
import {RangeSlider} from './RangeSlider';
import {SimpleExpansionPanel} from './SimpleExpansionPanel';

export const Filter = ({ 
    categories, 
    partners, 
    onSelectedCategory, 
    onSelectPartner,
    onSelectPriceRange
    }) => {
	const linkStyle = {
		paddingLeft: '30px',
    }
    

    return(
        <Grid>
            <p>Filter</p>
            <Grid item xs = {12}>
            <Category 
                categories = {categories}
                onSelectedCategory = {(selectedCategory) => onSelectedCategory(selectedCategory)}    
            />
            </Grid>
                <SimpleExpansionPanel 
                    partners = {partners}
                    onSelectPartner = {(selectedPartner) => onSelectPartner(selectedPartner)}
                    />
            <Grid 
                item xs = {10}
                style = {linkStyle}>
                <RangeSlider
                    onSelectPriceRange = {(minSelectedPrice, maxSelectedPrice) => onSelectPriceRange(minSelectedPrice, maxSelectedPrice)}
                />
            </Grid>
        </Grid>
    );
};