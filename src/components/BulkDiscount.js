// React imports
import React, {useState} from 'react';

// Component imports
import {SimpleExpansionPanel} from './SimpleExpansionPanel';
import Page from '../components/Page';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import CardHeader from "@material-ui/core/CardHeader";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import List from "@material-ui/core/List";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    root: {
        width: '100%',
        height: 400,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


export const BulkDiscount = ({
                                 props,
                                 discounts,
                                 posts,
                                 selectedDiscount,
                                 handleSelectChange,
                                 addPost,
                                 joinPost,
                                 leavePost}) => {
    const classes = useStyles();
    const [openAddNewPostDialog, setOpenAddNewPostDialog] = useState(false);

    const cardStyle = {
        textAlign: 'center'
    }

    const handleOpenAddNewPostDialog = (e) => {
        setOpenAddNewPostDialog(true);
    }

    const handleCloseAddNewPostDialog = () => {
        setOpenAddNewPostDialog(false);
    }

    return (
        <Page
            props={props}
        >
            <Card className={classes.card} title>
                <CardHeader title={`Join with other users to get access to bulk discounts`}/>
                <CardContent>
                    <Typography
                        color="textPrimary"
                    >

                        <Button data-key="add" onClick={handleOpenAddNewPostDialog}>
                            Create new post
                        </Button>
                    </Typography>
                    {posts.map((post) => (
                        <ListItem
                            key={post._id}
                        >
                            <ListItemText>
                                <ExpansionPanel>
                                    <ExpansionPanelSummary
                                        expandIcon = {<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                    >
                                        <Typography className={classes.heading}>
                                            {post.discount.name}
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <List>
                                            <Typography>
                                                Joined: {post.users.length}/{post.discount.bulkAmount}
                                            </Typography>
                                            <Typography>
                                                Discount description: {post.discount.bulkAmount}
                                            </Typography>
                                        </List>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </ListItemText>
                            {
                                post.joined &&

                                <Button
                                    key={post._id}
                                    onClick={() => leavePost(post._id)}
                                >
                                    Leave Post
                                </Button>
                            }
                            {
                                !post.joined &&
                                <Button
                                    key={post._id}
                                    onClick={() => joinPost(post._id)}
                                    disabled={post.isFull}
                                >
                                    Join Post
                                </Button>
                            }
                        </ListItem>

                    ))}
                </CardContent>
            </Card>
            <Dialog
                open={openAddNewPostDialog}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAddNewPostDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form onSubmit={addPost}>
                    <DialogTitle>
                        Create new post
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <FormControl>
                                <InputLabel htmlFor="my-input">Discount</InputLabel>
                                <Select name="discount" value={selectedDiscount} onChange={handleSelectChange}>
                                    {discounts.map((discount) => (
                                        <MenuItem value={discount._id}>{discount.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseAddNewPostDialog}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                        >
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Page>
    );
}