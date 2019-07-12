// React imports
import React, { useState } from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Component imports
import Page from './Page';
import { Category } from './Category';

export const AddItem = ({ categories, onAddItem }) => {
    const [item, setItem] = useState({ });

    const cardStyle = {
        textAlign: 'center'
    }

    const handleSubmit = () => {
        onAddItem(item);
    }

    const handleChangeItemName = (event) => {
        setItem({
            ...item,
            name: event.target.value
        });
    }

    const onSelectedCategory = (selectedCategory) => {
        setItem({
            ...item,
            categoryId: selectedCategory.value
        });
    }

    const handleChangeItemOldPrice = (event) => {
        setItem({
            ...item,
            oldPrice: event.target.value
        });
    }

    const handleChangeItemNewPrice = (event) => {
        setItem({
            ...item,
            newPrice: event.target.value
        });
    }

    const handleChangeItemType = (event) => {
        setItem({
            ...item,
            type: event.target.value
        });
    }

    const handleChangeItemDescription = (event) => {
        setItem({
            ...item,
            description: event.target.value
        });
    }

    const handleChangeItemDiscountPercentage = (event) => {
        setItem({
            ...item,
            discountPercentage: event.target.value
        });
    }

    return(
        <Page>
            <form className="md-grid" onSubmit = {handleSubmit}>
                <Card style = {cardStyle}>
                    <CardContent>
                        <Typography>
                           Add new item
                        </Typography>
                        <TextField
                            label = "Item name"
                            id = "itemNameTextField"
                            required = {true}
                            type = "text"
                            onChange = {handleChangeItemName}
                        /> <br/>
                        <Category 
                            categories = {categories}
                            onSelectedCategory = {(selectedCategory) => onSelectedCategory(selectedCategory)}    
                        /><br/>
                        <TextField
                            label = "Old price"
                            id = "itemOldPriceTextField"
                            required = {true}
                            type = "text"
                            onChange = {handleChangeItemOldPrice}
                        /> <br/>
                        <TextField
                            label = "New price"
                            id = "itemNewPriceTextField"
                            required = {true}
                            type = "text"
                            onChange = {handleChangeItemNewPrice}
                        /> <br/>
                        <TextField
                            label = "Item type"
                            id = "itemTypeTextField"
                            required = {false}
                            type = "text"
                            onChange = {handleChangeItemType}
                        /> <br/>
                        <TextField
                            label = "Item description"
                            id = "itemDescriptionTextField"
                            required = {false}
                            onChange = {handleChangeItemDescription}
                        /> <br/>
                        <TextField
                            label = "Item discount in percentage"
                            id = "itemDiscountInPercentageTextField"
                            required = {false}
                            type = "text"
                            onChange = {handleChangeItemDiscountPercentage}
                        /> <br/>
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