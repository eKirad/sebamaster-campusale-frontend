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
import {Category} from './Category';
import {SimpleSelect} from './SimpleSelect';

export const AddItem = ({props, categories, discounts, onFilterByKeyword, onAddItem}) => {
    const [item, setItem] = useState({ });

    const cardStyle = {
        textAlign: 'center'
    }

    const handleSubmit = () => {
        onAddItem(item);
    }

    const onSelectDiscount = (selectedDiscount) => {
        setItem({
            ...item,
            discount: selectedDiscount.value
        });
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

    const handleChangeItemPrice = (event) => {
        setItem({
            ...item,
            price: event.target.value
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

    const discountsObj = {
        label: `Discounts`,
        isDisabled: false,
        data: discounts
    }

    return(
        <Page
            onFilterByKeyword={onFilterByKeyword}
            props={props}
        >
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
                            onSelect = {(selectedCategory) => onSelectedCategory(selectedCategory)}    
                        /><br/>
                        <SimpleSelect 
                            data={discountsObj} 
                            onSelect={onSelectDiscount}
                        />
                        <TextField
                            label = "Price"
                            id = "itemPriceTextField"
                            required = {true}
                            type = "text"
                            onChange = {handleChangeItemPrice}
                        /> <br/>
                        <TextField
                            label = "Item description"
                            id = "itemDescriptionTextField"
                            required = {false}
                            onChange = {handleChangeItemDescription}
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