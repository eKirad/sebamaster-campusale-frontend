// React imports
import React from 'react';
import { Link } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Component imports
import Page from './Page';
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import RemoveIcon from '@material-ui/icons/Delete';

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
export const Wishlist = ({user, items,handleDeleteWishlistItem}) => {
    const linkStyle = {
        color: 'black',
        margin: '10px',
        textDecoration: 'none'
    }

    return(
    <Page>
        <div className={classes.root}>
            <Card>
                <CardHeader title={`${user.username}'s Wishlist`}/>
                <CardContent>
                    <Paper className={classes.paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Img</TableCell>
                                    <TableCell align="center">Item</TableCell>
                                    <TableCell align="center">New price</TableCell>
                                    <TableCell align="center">Old price</TableCell>
                                    <TableCell align="center">Remove</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.length === 0 && <h1>No item in wishlist</h1>}
                                {items.map(item => (
                                    <TableRow key={item._id}>
                                        <TableCell align="center">
                                            <Link
                                                style = {linkStyle}
                                                to = {`/item/${item._id}`}>
                                                Img comes here
                                            </Link>
                                        </TableCell>
                                        <TableCell component="th" scope="row"  align="center">
                                            <Link
                                                style = {linkStyle}
                                                to = {`/item/${item._id}`}>
                                                {item.name} - {item.description}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">EUR {item.price - item.price * (item.discount.amountInPercentage / 100)}</TableCell>
                                        <TableCell align="center">
                                            <strike>
                                                EUR {item.price}
                                            </strike>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => handleDeleteWishlistItem(item._id)}>
                                                <RemoveIcon/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </CardContent>
            </Card>
        </div>
    </Page>)
}