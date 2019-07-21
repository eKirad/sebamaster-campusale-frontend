// React imports
import React from 'react';

// Component imports
import  UserLogin  from '../components/UserLogin';

// Service imports
import UserService from '../services/UserService';

export class UserLoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoginError: false,
            message: {
                text: "",
                color: "red"
            }
        };
    
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(user) {
        UserService.login(user.username, user.password)
            .then((data) => {
                this.props.history.push('/');
            })
            .catch((e) => {

                if (!this.state.isLoginError) {
                    let message = {
                        text: `Login failure, please try again`,
                        color: "red"
                    };

                    this.setState({
                        isLoginError: true,
                        error: e,
                        message
                    });

                    this.props.history.push('/login');
                }
            });
    }

    render() {
        return(
            <UserLogin
                isLoginError={this.state.isLoginError}
                message={this.state.message}
                onSubmit = {this.handleLogin}/>
        );
    }
}