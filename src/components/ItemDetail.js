// Default imports
import React from 'react';

// Material UI imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// Component imports
import Page from './Page';


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

export class ItemDetail extends React.Component {
    constructor(params) {
        super(params);
    }

    render() {
        return(
            <Page>
            <div className={classes.root}>
                <Grid container spacing={10}>
                    <Grid item xs={2}>
                        <Paper className={classes.paper}>

                        </Paper>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper className={classes.paper}>
                            <h1>{this.props.item.itemName} 
                                <button>Add to wishlist</button> 
                                <button>To the offer</button>
                            </h1>
                            <p>{this.props.item.price} EUR</p>
                            <h3>Offer description:</h3>
                            <div>
                                <h3>Item description:</h3>      
                                <p>{this.props.item.description}</p>
                            </div>
                 
                        </Paper>
                    </Grid>
                </Grid>
                </div>
            </Page>
        );
    }
}
