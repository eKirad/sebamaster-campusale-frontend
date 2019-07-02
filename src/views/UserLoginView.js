// React imports
import React from 'react';

// Component imports
import  UserLogin  from '../components/UserLogin';

// Service imports
import UserService from '../services/UserService';

export class UserLoginView extends React.Component {
    constructor(props) {
        super(props);
    }

    login(user) {
        UserService.login(user.username, user.password)
            .then((data) => {
                console.log(`Data inside the UserLoginView`)
                console.log(data);
                this.props.history.push('/');
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