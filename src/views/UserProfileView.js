// React imports
import React from 'react';

// Component imports
import { UserProfile } from '../components/UserProfile';
import { Loading } from '../components/Loading';

// Service imports
import UserService from '../services/UserService'

export  class UserProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: UserService.isAutehnticated() ? UserService.getCurrentUser() : undefined
            user: undefined,
            loading: true
        }
    }

    componentDidMount() {
        if (UserService.isAutehnticated()) {
            UserService
            .getCurrentUser2()
            .then((user) => {
                this.setState({
                    user: user,
                    loading: false
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

        if (this.state.loading) {
            return (<Loading/>);
        }
        
        return(
            <UserProfile user = {this.state.user}/>
        );
    }
}