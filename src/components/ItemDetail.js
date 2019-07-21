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
import Card from '@material-ui/core/Card';
// Component imports
import Page from './Page';
import UserService from '../services/UserService'
import HttpService from "../services/HttpService";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    itemImg: {
        width: "150px",
        height: "150px",
        margin: "20px"
    }
}));

export const ItemDetail = ({
                               props,
                               item,
                               onFilterByKeyword,
                               onWishlistClick,
                               itemInWishlist,
                           }) => {
    const classes = useStyles();
    const userRole = UserService.getCurrentUser().role

    return (
        <Page onFilterByKeyword={onFilterByKeyword}>

                <Grid container>
                    <Grid item xs={2}>
                        <Card>
                            <img className={classes.itemImg}
                                 src={`${HttpService.baseURI()}/items/image/${item.imagePath}`}/>
                        </Card>
                    </Grid>
                    <Grid item xs={10}>
                        <Paper className={classes.paper} >
                            <Grid style={{minHeight:"200px"}}>
                                <Grid item xs={10}>
                                    <h1>
                                        {item.name}
                                        {userRole === 'student' &&
                                        <IconButton onClick={onWishlistClick}>
                                            {
                                                itemInWishlist
                                                &&
                                                <FavIconFull/>
                                            }
                                            {
                                                !itemInWishlist
                                                &&
                                                <FavIcon/>
                                            }
                                        </IconButton>
                                        }
                                        <Button
                                            style={{float:"right"}}
                                            component={Link}
                                            to={item.uri}>
                                            To the offer
                                        </Button>
                                    </h1>
                                </Grid>
                                <Grid item>
                                    <b>
                                        Price: {(item.price - item.price * (item.discount.amountInPercentage / 100)).toFixed(2)} EUR
                                        (<strike>{item.price} EUR</strike>)
                                    </b>
                                </Grid>
                                <br/>
                                <Grid item>
                                    <b>Offer description:</b>

                                </Grid>
                                <Grid item>
                                    {item.discount.name}
                                </Grid>
                                <br/>
                                <Grid item>
                                    <b>Item description:</b>
                                </Grid>
                                <Grid item>
                                    {item.description}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

        </Page>
    );
}

