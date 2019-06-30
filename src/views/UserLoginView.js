// React imports
import React from 'react';

// Component imports
import { UserLogin } from '../components/UserLogin';

// Service imports
import UserService from '../services/UserService';

export class UserLoginView extends React.Component {
    constructor(props) {
        super(props);
    }

    login() {
        UserService.login(user.username, user.password)
            .then((data) => {
                console.log(data);
            })
    }



    render() {
        return(    
                <UserLogin 
                    onSubmit = { (user) => this.login(user) }
                />
        );
    }
}