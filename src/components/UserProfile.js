import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Page from './Page';
import {SimpleSelect} from './SimpleSelect';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));


export const UserProfile = ({props, user, message, handleInputChange, onEditUser, onFilterByKeyword}) => {
    const classes = useStyles();
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        onEditUser(user);
        setIsDisabled(!isDisabled);
        setIsSaveDisabled(!isSaveDisabled);
    }

    const handleEditProfile = () => {
        setIsDisabled(!isDisabled);
        setIsSaveDisabled(!isSaveDisabled);
    }
    
    return (
        <Page
            onFilterByKeyword={onFilterByKeyword}
            props={props}
        >
            <form onSubmit={handleSubmit}>
                <Card className="submit-card">
                    <CardContent>
                        { message.text.length > 0 &&
                        <span style={{color:message.color}}>{message.text}<br/></span>

                        }
                        <br/>
                        <TextField
                            label="Username"
                            id="usernameField"
                            type="text"
                            value={user.username}
                            disabled={true}

                            // onChange = { this.handleChangeUsername }
                            // error = "Username is a required field"
                        /> <br/>
                        <TextField
                            label="Email"
                            id="emailField"
                            type="text"
                            value={user.email}
                            InputProps ={{name: "email"}}
                            disabled={isDisabled}
                            onChange={handleInputChange}
                            // error = "Username is a required field"
                        /> <br/>
                        <TextField
                            label="New Password"
                            id="passwordField"
                            type="password"
                            InputProps ={{name: "password"}}
                            disabled={isDisabled}
                            onChange={handleInputChange}
                        /> <br/>
                        <TextField
                            label="Birthdate"
                            id="birthdateField"
                            type="date"
                            disabled={isDisabled}
                            InputLabelProps={{shrink: true}}
                            InputProps ={{name: "dateOfBirth"}}
                            value={user.dateOfBirth}
                            onChange={handleInputChange}
                        /> <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="gender">
                                Gender
                            </InputLabel>
                            <Select
                                value={user.gender}
                                onChange={handleInputChange}
                                disabled={isDisabled}
                                inputProps={{
                                    name: `gender`,
                                    id: `gender`
                                }}
                            >
                                <MenuItem value=""/>
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="divers">Diverse</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="location">
                                Location
                            </InputLabel>
                            <Select
                                value={user.location}
                                onChange={handleInputChange}
                                disabled={isDisabled}
                                inputProps={{
                                    name: `location`,
                                    id: `location`
                                }}
                            >

                                <MenuItem value=""/>
                                <MenuItem value="DE">Germany</MenuItem>
                                <MenuItem value="US">United States</MenuItem>
                                <MenuItem value="UK">United Kingdom</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <Button onClick={handleEditProfile}>
                            Edit profile
                        </Button>
                        <Button
                            id="saveBtn"
                            type="submit"
                            disabled={isSaveDisabled}
                        >
                            Save
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Page>
    );
}

