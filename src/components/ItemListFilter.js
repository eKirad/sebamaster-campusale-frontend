// React imports
import React from 'react';
import withRouter from 'react-router-dom';

// Material UI imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// Component imports
import Page from './Page';
import {ItemList} from './ItemList';
import {Category} from './Category';
import {Filter} from './Filter';

const classes = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export const ItemListFilter = ({
    items, 
    categories, 
    partners, 
    props, 
    onSelectCategory,
    onSelectPartner,
    onSelectPriceRange,
    onEnterKeyword}) => {
    const onSelectedCategory = (selectedCategory) => {
        onSelectCategory(selectedCategory);
    }

    const onFiltered = (filterCriteria) => {
        onEnterKeyword(filterCriteria);
    }

    return(
        <Page
            props = {props}
            onFiltered = {(filterCriteria) => onFiltered(filterCriteria)}>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Filter
                            categories = {categories}
                            partners = {partners}
                            onSelectedCategory = {(selectedCategory) => onSelectedCategory(selectedCategory)}
                            onSelectPartner = {(selectedPartner) => onSelectPartner(selectedPartner)}
                            onSelectPriceRange = {(minSelectedPrice, maxSelectedPrice) => onSelectPriceRange(minSelectedPrice, maxSelectedPrice)}
                            />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper className={classes.paper}>
                        <ItemList items = {items}/>                        
                    </Paper>
                </Grid>
            </Grid>
        </div>
        </Page>
    );
}
