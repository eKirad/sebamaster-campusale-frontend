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
            isLoginError: false
        };
    }

    login(user) {
        UserService.login(user.username, user.password)
            .then((data) => {
                this.props.history.push('/');
            })
            .catch((e) => {
                this.setState({
                    isLoginError: true
                });
                this.props.history.push('/login');
                console.error(e);
                this.setState = {
                    error: e
                }
            });
    }

    render() {
        if (this.state.isLoginError) {
            return(
                <UserLogin
                    isError = {this.state.isLoginError}
                    onSubmit = { (user) => this.login(user) }/> 
            );
        }
        
        return(
            <UserLogin onSubmit = { (user) => this.login(user) }/>
        );
    }
}