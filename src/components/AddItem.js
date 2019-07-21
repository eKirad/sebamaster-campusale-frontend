// React imports
import React, {useState} from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


// Component imports
import Page from './Page';
import {Category} from './Category';
import {SimpleSelect} from './SimpleSelect';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    textFieldStyle: {
        width: '303px'
    },
    formControl: {
        margin: theme.spacing(1),
        width: "303px",
    },
}));

export const AddItem = ({
                            props,
                            item,
                            categories,
                            discounts,
                            handleInputChange,
                            handleFileChange,
                            onFilterByKeyword,
                            onAddItem,
                            message}) => {

    const classes = useStyles();

    return (
        <Page
            onFilterByKeyword={onFilterByKeyword}
            props={props}
        >
            <ValidatorForm
                           className="md-grid"
                           onSubmit={onAddItem}
                           onError={errors => console.log(errors)}>
                <Card className="submit-card">
                    <CardHeader title="Add new item"/>
                    <CardContent>
                        { message.text.length > 0 &&
                        <span style={{color:message.color}}>{message.text}</span>

                        }
                        <br/>
                        <TextValidator
                            className={classes.textFieldStyle}
                            label="Item name"
                            id="itemNameTextField"
                            name="name"
                            value={item.name}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            type="text"
                            onChange={handleInputChange}
                        /> <br/>
                        <Category
                            categories={categories}
                            onSelect={handleInputChange}
                            value={item.categoryId}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="discount">
                                Discount
                            </InputLabel>
                            <Select
                                value={item.discount}
                                onChange={handleInputChange}
                                inputProps={{
                                    name: `discount`,
                                    id: `discount`
                                }}
                            >
                                {discounts.map(discount => (
                                    <MenuItem key={discount._id} value={discount._id}>
                                        {discount.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextValidator
                            className={classes.textFieldStyle}
                            label="Price"
                            id="itemPriceTextField"
                            onChange={handleInputChange}
                            type="text"
                            name="price"
                            value={item.price}
                            validators={['required', 'isNumber', 'isPositive']}
                            errorMessages={['This field is required', 'Please enter a number', 'Price must be positive']}
                        /><br/>
                        <TextField
                            className={classes.textFieldStyle}
                            label="Item description"
                            value={item.description}
                            InputProps={{name:'description', id:"itemDescriptionTextField"}}
                            onChange={handleInputChange}
                        /> <br/>
                        <TextValidator
                            className={classes.textFieldStyle}
                            label="Item URL"
                            InputProps={{name:'uri', id:"itemURLTextField"}}
                            value={item.uri}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            onChange={handleInputChange}
                        /> <br/>
                        <TextField
                            className={classes.textFieldStyle}
                            label="Image"
                            type="file"
                            InputProps={{name:'image', id:"imageUploadField",accept:"image/png"}}
                            onChange={handleFileChange}
                        /> <br/>
                        <Button
                            id="submitBtn"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </ValidatorForm>
        </Page>
    );
}