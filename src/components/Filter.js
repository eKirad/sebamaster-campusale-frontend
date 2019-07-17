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
    onSelectCategory, 
    onSelectPartner,
    onSelectPriceRange
    }) => {
    const linkStyle = {
		paddingLeft: '30px',
    }
    
    const usage = `filter`;
    const title = `Brand`

    return(
        <Grid>
            <p>Filter</p>
            <Grid item xs={12}>
            <Category 
                categories={categories}
                onSelect={onSelectCategory}    
            />
            </Grid>
                <SimpleExpansionPanel
                    title={title}
                    usage={usage} 
                    partners={partners}
                    onSelectPartner={onSelectPartner}
                />
            <Grid 
                item xs = {10}
                style = {linkStyle}>
                <RangeSlider
                    onSelectPriceRange = {onSelectPriceRange}
                />
            </Grid>
        </Grid>
    );
};