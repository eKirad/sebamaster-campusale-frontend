// React imports
import React, {useState} from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

// Component imports
import Page from './Page';
import {SimpleSelect} from './SimpleSelect';
import {CheckboxList} from '../components/CheckboxList';

const useStyles = makeStyles((theme) => ({
    card: {
        width:"100%"
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

export const DiscountDashboard = ({
                                      currentUser,
                                      currentDiscount,
                                      discounts,
                                      message,
                                      handleAddDiscount,
                                      handleUpdateDiscount,
                                      handleInputChange,
                                      onDeleteDiscount,
                                      onAddDiscount,
                                      onUpdateDiscount,
                                      onFilterByKeyword
                                  }) => {
    const classes = useStyles();
    const [openDiscountDialog, setOpenDiscountDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState(undefined);
    const [dialogMode, setDialogMode] = useState("add");

    const handleOpenAddDiscountDialog = (e) => {
        setDialogTitle(`Add`);
        setDialogMode("add");
        onAddDiscount();
        setOpenDiscountDialog(true);
    }

    const handleCloseDiscountDialog = () => {
        setOpenDiscountDialog(false);
    }
    
    const handleOpenUpdateDialog = (discountId) => {
        setDialogTitle(`Update`);
        setDialogMode("update");
        console.log(currentDiscount);
        onUpdateDiscount(discountId);
        setOpenDiscountDialog(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (dialogMode === "add") {
            handleAddDiscount();
        }
        else if (dialogMode === "update") {
            handleUpdateDiscount();
        }
        setOpenDiscountDialog(false);
    }
    
    return (
        <Page onFilterByKeyword={onFilterByKeyword}>
            <Button style={{float:"right"}} data-key="add" onClick={handleOpenAddDiscountDialog}>
                Add new discount
            </Button>
            <Card className={classes.card}>
                <CardHeader title="Discounts"/>
                <CardContent>
                    { message.text.length > 0 &&
                    <span style={{color:message.color}}>{message.text}</span>

                    }
                    <br/>
                    {discounts.map((discount) => (
                        <ListItem>
                            <ListItemText>
                                {discount.name}
                            </ListItemText>
                            <IconButton
                                onClick={() => handleOpenUpdateDialog (discount._id)}
                            >
                                <EditIcon/>
                            </IconButton>
                            <IconButton
                                key={discount._id}
                                onClick={() => onDeleteDiscount(discount._id)}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </ListItem>
                    ))}
                </CardContent>
            </Card>
            <Dialog
                open={openDiscountDialog}
                keepMounted
                onClose={handleCloseDiscountDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="alert-add-new-category-dialog-slide-title">
                        {`${dialogTitle} discount`}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-add-new-category-dialog-slide-description">
                            <TextField
                                label="Name"
                                type="text"
                                onChange={handleInputChange}
                                value={currentDiscount.name}
                                inputProps={{
                                    name: `name`,
                                    id: `discountNameTextField`
                                }}

                            /> <br/>
                            <TextField
                                label="Amount in percentage"
                                type="text"
                                onChange={handleInputChange}
                                value={currentDiscount.amountInPercentage}
                                inputProps={{
                                    name: `amountInPercentage`,
                                    id: `discountAmountTextField`
                                }}
                            /> <br/>
                            <TextField
                                label="Amount needed for bulk discount (Optional)"
                                type="text"
                                onChange={handleInputChange}
                                value={currentDiscount.bulkAmount}
                                inputProps={{
                                    name: `bulkAmount`,
                                    id: `bulkAmountTextField`
                                }}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleCloseDiscountDialog}>
                            Close
                        </Button>
                        <Button
                            type="submit"
                        >
                            {dialogTitle}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Page>
    );
}   