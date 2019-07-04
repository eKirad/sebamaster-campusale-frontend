// React imports
import React from 'react';

// Component imports
import { UserProfile } from '../components/UserProfile';


// Service imports
import UserService from '../services/UserService'

export  class UserProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: UserService.isAutehnticated() ? UserService.getCurrentUser() : undefined
        }
    }

    componentDidMount() {
        if (UserService.isAutehnticated()) {
            UserService
            .getCurrentUser2()
            .then((user) => {
                this.setState({
                    user: user
                })
            })
            .catch(e => { console.error(e); })
        } else {
            this.setState({
                user: { }
            })
        }

    }

    render() {
        console.log(`Inside the state of the USerProfileView`)
        console.log(this.state.user.username)
        return(
            <UserProfile user = {this.state.user}/>
        );
    }
}