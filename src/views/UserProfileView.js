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

        this.onFilterByKeyword = this.onFilterByKeyword.bind(this);
    }

    onEditUser(newUser) {
        UserService
            .updateUser(newUser)
            .then((user) => { })
            .catch(e => { console.error(e); })
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

    filterItemsBySearchKeyword(keyword) {
        this.props.history.push(`/?search=${keyword}`);   
    }

    onFilterByKeyword(filterCriteria) {
        this.filterItemsBySearchKeyword(filterCriteria);
    }

    render() {

        if (this.state.loading) {
            return (<Loading/>);
        }
        
        return(
            <UserProfile 
                props = {this.props}
                user = {this.state.user}
                onEditUser = {(newUser) => this.onEditUser(newUser)}
                onFilterByKeyword = {this.onFilterByKeyword}
                />
        );
    }
}