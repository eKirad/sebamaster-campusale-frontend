// React imports
import React, {useState} from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List'

// Component imports
import Page from './Page';
import { SimpleSelect } from './SimpleSelect';
import {CheckboxList} from '../components/CheckboxList';

export const SetDiscount = ({discounts, items, onSelectedDiscount}) => {
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

    const discountsObj = {
        label: `Discounts`,
        isDisabled: false,
        data: discounts
    }

    return(
        <Page>
            <form className="md-grid" onSubmit = {handleSubmit}>
                <Card style = {cardStyle}>
                    <CardContent>
                        <Typography>
                           Set discout
                        </Typography>
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