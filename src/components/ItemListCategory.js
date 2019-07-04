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
    const onSelectedCategory = (selectedCategory) => {
        console.log(`Inside the onSelectedCategory() of ItemListCategory`)
        console.log(selectedCategory);
        onSelectCategory(selectedCategory);
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
