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
            loading: true,
            message: {
                text: "",
                color: "red"
            }
        }

        this.onFilterByKeyword = this.onFilterByKeyword.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onEditUser(newUser) {
        UserService
            .updateUser(newUser)
            .then((user) => {
                let message = {
                    text: "User is updated successfully!",
                    color: "green"
                };
                this.setState({message});
            })
            .catch(e => {
                let message = {
                    text: e,
                    color: "red"
                };
                this.setState({message});
            })
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

    handleInputChange(e)
    {
        let user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState(user);
    }
    render() {

        if (this.state.loading) {
            return (<Loading/>);
        }
        
        return(
            <UserProfile 
                props = {this.props}
                user = {this.state.user}
                message= {this.state.message}
                handleInputChange = {this.handleInputChange}
                onEditUser = {(newUser) => this.onEditUser(newUser)}
                onFilterByKeyword = {this.onFilterByKeyword}
                />
        );
    }
}