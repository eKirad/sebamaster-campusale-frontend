// React imports
import React, {useState} from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Component imports
import Page from './Page';

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

export const CategoryDashboard = ({props, categories, onAddNewCategory, onDeleteCategory, onFilterByKeyword}) => {
    const classes = useStyles();
    const [openAddNewCategoryDialog, setOpenAddNewCategoryDialog] = useState(false);
    const [newCategory, setNewCategory] = useState({ });

    const handleSubmitNewCategory = () => {
        onAddNewCategory(newCategory)
    }

    const handleOpenAddNewCategoryDialog = () => {
        setOpenAddNewCategoryDialog(true);
    }

    const handleCloseAddNewCategoryDialog = () => {
        setOpenAddNewCategoryDialog(false);
        if(props.props.location.pathname != '/') {
            props.props.history.push('/');
        }
        else {
            window.location.reload();
        }
    }

    const handleChangeCategoryName = (e) => {
        setNewCategory({
            ...newCategory,
            name: e.target.value
        });
    }

    const handleChangeCategoryDescription = (e) => {
        setNewCategory({
            ...newCategory,
            description: e.target.value
        }); 
    }

    return(
        <Page 
            props={props}
            onFilterByKeyword={onFilterByKeyword}
        >
            <Button onClick={handleOpenAddNewCategoryDialog}>
                Add new category
            </Button>
            <Card className = {classes.card}>
                <CardContent>
                    <Typography color = "textPrimary">
                            Categories
                    </Typography>
                    {categories.map((category) => (
                        <ListItem key = {category._id}>
                            <ListItemText>
                                {category.name}
                            </ListItemText>
                            <IconButton
                                key = {category._id}
                                onClick = {() => onDeleteCategory(category._id)}
                                >
                                <DeleteIcon/>
                            </IconButton>
                        </ListItem>
                    ))}
                </CardContent>
            </Card>
            <Dialog
                open={openAddNewCategoryDialog}
                // TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAddNewCategoryDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
                    <form onSubmit={handleSubmitNewCategory}>
                        <DialogTitle id="alert-add-new-category-dialog-slide-title">
                            {`Add new category`}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-add-new-category-dialog-slide-description">
                                <Typography>
                                    <TextField 
                                        label = "Name"
                                        id = "categoryNameTextField"
                                        type = "text"
                                        onChange = {handleChangeCategoryName}
                                    /> <br/>
                                    <TextField 
                                        label = "Description"
                                        id = "categoryDescriptionTextField"
                                        type = "text"
                                        onChange = {handleChangeCategoryDescription}
                                    /> 
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick = {handleCloseAddNewCategoryDialog}>
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