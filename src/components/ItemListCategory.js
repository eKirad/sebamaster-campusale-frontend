import React from 'react';
import Page from './Page';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import withRouter from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {ItemList} from './ItemList';
import {Category} from './Category';

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

export const ItemListCategory = ({items, categories, props, onSelectCategory}) => {

    console.log(`These are the items inside ItemListCategory`)
    console.log(items);

    console.log(`These are the props inherited from ItemListCategoryView`)
    console.log(props);

    // const filterItemsByCategory = (id) => {
    //     items = items
    //         .filter(item => item.categoryId === id);
    //     console.log(items);
    // }
    
    const onSelectedCategory = (selectedCategory) => {
        console.log(`Inside the onSelectedCategory() of ItemListCategory`)
        console.log(selectedCategory);
        onSelectCategory(selectedCategory);
        // filterItemsByCategory(selectedCategory.value);
        // props.history.push('/');
    }

    return(
        <Page>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Category 
                            categories = {categories}
                            onSelectedCategory = {(selectedCategory) => onSelectedCategory(selectedCategory)}    
                        />
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
