// React imports
import React from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Component imports
import Page from './Page';

export class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const cardStyle = {
            textAlign: 'center'
        }
        
        return(
            <Page>
                <Card style = {cardStyle}>
                    <CardContent>
                        <TextField 
                            label = "Username"
                            id = "usernameField"
                            type = "text"
                            // value = { this.state.username }
                            // onChange = { this.handleChangeUsername }
                            // error = "Username is a required field"
                            /> <br/>
                        <TextField 
                            label = "Password"
                            id = "passwordField"
                            type = "password"
                            required = { true }
                            // value = { this.state.password }
                            // onChange = { this.handleChangePassword }
                            // error = "Password is a required field"
                            /> <br/> <br/>
                        <Button 
                            variant="contained"
                            id = "submitBtn"
                            type = "submit"
                            // disabled = { this.validateTextFields() }
                            >
                                Sign up
                        </Button>
                    </CardContent>
                </Card>
            </Page>
        );
    }
}