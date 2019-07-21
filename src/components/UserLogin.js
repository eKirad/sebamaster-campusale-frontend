// React imports
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

// Component imports
import Page from './Page';

const linkStyle = {
    color: 'blue',
    margin: '10px'
}
class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ``,
            password: ``
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        })  
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const user = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.onSubmit(user);
    }

    validateTextFields() {
        return (this.state.username === undefined || this.state.username === ``
            || this.state.password === undefined || this.state.password === ``) ? true : false;
    }

    render() {
        return (
            <Page >
            <ValidatorForm   className="md-grid"  onSubmit={this.handleSubmit}>
                <Card className="submit-card">
                    <CardHeader title="Log in"></CardHeader>
                    <CardContent>
                        { this.props.isLoginError ? 
                            <span style={{color:this.props.message.color}}>
                                {this.props.message.text}<br/>
                                <Link style={linkStyle} to={'/signup'}>
                                    Not registered? Please sign up
                                </Link>
                            </span>
                        : null}
                    <TextValidator
                            label="Username"
                            id="usernameField"
                            name="name"
                            value = { this.state.username }
                            validators={['required']}
                            errorMessages={['This field is required']}
                            type="text"
                            onChange = {this.handleChangeUsername}
                            /> <br/>
                    <TextValidator
                            label="Password"
                            id="passwordField"
                            name="name"
                            value = {this.state.password}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            type="password"
                            onChange = {this.handleChangePassword}
                            /> <br/><br/>
                        <Button 
                            variant="contained"
                            id = "submitBtn"
                            type = "submit"
                            disabled = {this.validateTextFields()}
                            >
                                Login
                        </Button>
                    </CardContent>
                </Card>
            </ValidatorForm>
            </Page>
        )
    }
};

export default withRouter(UserLogin);