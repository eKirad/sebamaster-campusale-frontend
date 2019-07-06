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

export const ItemListFilter = ({items, categories, props, onSelectCategory, onFilter}) => {
    const onSelectedCategory = (selectedCategory) => {
        console.log(`Inside the onSelectedCategory() of ItemListFilter`)
        console.log(selectedCategory);
        onSelectCategory(selectedCategory);
    }

    const onFiltered = (filterCriteria) => {
        onFilter(filterCriteria);
    }

    return(
        <Page onFiltered = {(filterCriteria) => onFiltered(filterCriteria)}>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Filter
                            categories = {categories}
                            onSelectedCategory = {(selectedCategory) => onSelectedCategory(selectedCategory)}/>
                        {/* <Category 
                            categories = {categories}
                            onSelectedCategory = {(selectedCategory) => onSelectedCategory(selectedCategory)}    
                        /> */}
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <ItemList items = {items}/>                        
                    </Paper>
                </Grid>
            </Grid>
        </div>
        </Page>
    );
}
