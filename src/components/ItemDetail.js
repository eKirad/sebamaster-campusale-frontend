// React imports
import React from 'react';

// Material UI imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavIcon from '@material-ui/icons/FavoriteBorder';
import FavIconFull from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

// Component imports
import Page from './Page';
import UserService from '../services/UserService'

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
    constructor(props) {
        super(props);
    }

    render() {
        const userRole = UserService.getCurrentUser().role
        return (
            <Page onFilterByKeyword={this.props.onFilterByKeyword}>
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
                                    <Grid item xs={10}>
                                        <h1>
                                            {this.props.item.name}
                                            {userRole === 'student' &&
                                            <IconButton onClick={this.props.onWishlistClick}>
                                                {
                                                     this.props.itemInWishlist
                                                    &&
                                                    <FavIconFull/>
                                                }
                                                {
                                                    !this.props.itemInWishlist
                                                    &&
                                                    <FavIcon/>
                                                }
                                            </IconButton>
                                            }
                                            <Button>
                                                To the offer
                                            </Button>
                                        </h1>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <b>
                                            Price: {this.props.item.newPrice} EUR
                                            (<strike>{this.props.item.oldPrice} EUR</strike>)
                                        </b>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <b>Offer description:</b>
                                       
                                    </Grid>
                                    <Grid item xs={10}>
                                        {this.props.item.discount.name}
                                    </Grid>
                                    <Grid item xs={10}>
                                        <b>Item description:</b>
                                    </Grid>
                                    <Grid item xs={10}>
                                        {this.props.item.description}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Page>
        );
    }
}
