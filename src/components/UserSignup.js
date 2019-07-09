// React imports
import React from 'react';

// Material UI imports
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';


import Page from './Page';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));

export class UserSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ``,
            password: ``,
            email: ``
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({
            username: event.target.value
        });

        console.log(this.state.username)
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        })  
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(`The username is = ${this.state.username}`);
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            role: `student`
        }

        console.log(`Inside HANDLE SUBMIT`)
        console.log(user)

        this.props.onSubmit(user);
    }

    validateTextFields() {
        return (this.state.username === undefined || this.state.username === ``
            || this.state.password === undefined || this.state.password === ``) ? true : false;
    }

    render() {
        const cardStyle = {
            textAlign: 'center'
        }

        return (
            <Page>
            <form className="md-grid" onSubmit = {this.handleSubmit}>
                <Card style = {cardStyle}>
                    <CardContent>
                        <TextField 
                            label = "Username"
                            id = "usernameField"
                            required = {true}
                            type = "text"
                            value = {this.state.username}
                            onChange = {this.handleChangeUsername}
                            // error = "Username is a required field"
                        /> <br/>
                        <TextField 
                            label = "Email"
                            id = "emailField"
                            required = {true}
                            type = "text"
                            value = {this.state.email}
                            onChange = {this.handleChangeEmail}
                            // error = "Username is a required field"
                        /> <br/>
                        <TextField 
                            label = "Password"
                            id = "passwordField"
                            type = "password"
                            required = {true}
                            value = {this.state.password}
                            onChange = {this.handleChangePassword}
                            // error = "Password is a required field"
                            /> <br/> <br/>
                        <Button 
                            variant="contained"
                            id = "submitBtn"
                            type = "submit"
                            disabled = {this.validateTextFields()}
                            >
                                Sign up
                        </Button>
                    </CardContent>
                </Card>
            </form>
            </Page>

        )
    }
}
