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

export const ItemListCategory = ({items, categories}) => {

    return(
        <Page>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <Category categories = {categories}/>
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