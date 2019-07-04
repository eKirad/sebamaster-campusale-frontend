// Default imports
import React from 'react';

// Material UI imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';

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
                            Images come here
                        </Paper>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <Grid item xs = {10}>
                                    <h1>
                                        {this.props.item.name}
                                        <IconButton>
                                            <FavIcon/>
                                        </IconButton>
                                        <Button>
                                            To the offer
                                        </Button>
                                    </h1>
                                </Grid>
                                <Grid item xs = {10}>
                                    <b>
                                        Price: {this.props.item.newPrice} EUR 
                                            (<strike>{this.props.item.oldPrice} EUR</strike>)
                                    </b>
                                </Grid>
                                <Grid item xs = {10}>
                                    <b>Offer description:</b>
                                </Grid>
                                <Grid item xs = {10}>
                                    {this.props.item.description}
                                </Grid>
                                <Grid item xs = {10}>
                                    <b>Item description:</b>
                                </Grid>
                                <Grid item xs = {10}>
                                    {this.props.item.description}
                                </Grid>
                            </Grid>
                            
                            
                            {/* <h1>{this.props.item.itemName} 
                                <button>Add to wishlist</button> 
                                <button>To the offer</button>
                            </h1>
                            <p>{this.props.item.price} EUR</p>
                            <h3>Offer description:</h3>
                            <div>
                                <h3>Item description:</h3>      
                                <p>{this.props.item.description}</p>
                            </div> */}
                        </Paper>
                    </Grid>
                </Grid>
                </div>
            </Page>
        );
    }
}
