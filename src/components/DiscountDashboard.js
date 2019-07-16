// React imports
import React, {useState} from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// Component imports
import Page from './Page';
import {SimpleSelect} from './SimpleSelect';
import {CheckboxList} from '../components/CheckboxList';

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

export const DiscountDashboard = ({currentUser, discounts, onSelectedDiscount, onDeleteDiscount, onAddDiscount, items}) => {
    const classes = useStyles();
    const [openAddNewDiscountDiaglog, setOpenAddNewDiscountDiaglog] = useState(false);
    const [newDiscount, setNewDiscount] = useState({ }); 
    const [selectedDiscountId, setSelectedDiscountId] = useState();
    const [selectedItems, setSelectedItems] = useState([ ]);

    const cardStyle = {
        textAlign: 'center'
    }

    const handleSubmit = () => {
        // Need to be tranformed, in order to sent an array. For further information
        // check lines 64-67 in the return JSX
        onSelectedDiscount(selectedDiscountId, selectedItems[0]._id)
    }

    const onSelect = (selectedDiscountId) => {
       setSelectedDiscountId(selectedDiscountId.value);
    }

    const onSelectItem = (selectedItem) => {
        setSelectedItems([
            ...selectedItems,
            selectedItem
        ]);
    }

    const handleOpenAddDiscountDialog = () => {
        setOpenAddNewDiscountDiaglog(true);
    }

    const handleCloseAddNewDiscountDialog = () => {
        setOpenAddNewDiscountDiaglog(false);
    }

    const handleSubmitNewDiscount = () => {
        onAddDiscount(newDiscount);
    }

    const handleChangeDiscountName = (e) => {
        setNewDiscount({
            ...newDiscount,
            name: e.target.value,
            partnerId: currentUser.partnerId
        });
    }

    const handleChangeDiscountAmount = (e) => {
        setNewDiscount({
            ...newDiscount,
            amountInPercentage: e.target.value
        });
    }


    const discountsObj = {
        label: `Discounts`,
        isDisabled: false,
        data: discounts
    }
    return(
        <Page>
            <Button onClick={handleOpenAddDiscountDialog}>
                Add new discount
            </Button>
            <Card className = {classes.card}>
                <CardContent>
                    <Typography color = "textPrimary">
                            Discounts
                    </Typography>
                        {discounts.map((discount) => (
                            <ListItem key = {discount._id}>
                                <ListItemText>
                                    {discount.name}
                                </ListItemText>
                                <IconButton
                                    key = {discount._id}
                                    onClick = {() => onDeleteDiscount(discount._id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        ))}
                    </CardContent>
                </Card>
                <Dialog
                    open={openAddNewDiscountDiaglog}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseAddNewDiscountDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <form onSubmit={handleSubmitNewDiscount}>
                        <DialogTitle id="alert-add-new-category-dialog-slide-title">
                            {`Add new discount`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-add-new-category-dialog-slide-description">
                                <Typography>
                                    <TextField 
                                        label="Name"
                                        id="discountNameTextField"
                                        type="text"
                                        onChange={handleChangeDiscountName}
                                    /> <br/>
                                    <TextField 
                                        label="Amount in percentage"
                                        id="discountAmountTextField"
                                        type="text"
                                        onChange={handleChangeDiscountAmount}
                                    /> 
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleCloseAddNewDiscountDialog}>
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
            <form className="md-grid" onSubmit = {handleSubmit}>
                <Card style = {cardStyle}>
                    <CardContent>
                        <Typography>
                           Set discout on items
                        </Typography>
                        <Button id="submittBtn" type="submit">
                            Submit
                        </Button>
                        <SimpleSelect 
                            data = {discountsObj} 
                            onSelect = {(selectedOption) => onSelect(selectedOption)}
                        />
                        <Typography>
                            Items
                        </Typography>
                        {/* The CheckboxList allows only single checkbox selection. Here we do 
                            need a multiple checkbox selection, since the partner would like to 
                            set a specific discount on multiple items simultaneously. TODO
                        */}
                        <CheckboxList 
                            data = {items}
                            onSelectData = {((selectedItem) => onSelectItem(selectedItem))}
                        />
                        <Button
                            id = "submittBtn"
                            type = "submit"
                        >
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Page>
    );
}