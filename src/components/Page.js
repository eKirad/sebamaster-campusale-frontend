// React imports
import React from 'react';
import { withRouter } from 'react-router-dom';
import Redirect from 'react-router-dom';

// Component imports
import Header from './Header';
import {Footer} from './Footer';
import {AuthorizedHeader} from './AuthorizedHeader';

// Service imports
import UserService from '../services/UserService';

export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ``,
            user: UserService.isAutehnticated() ? UserService.getCurrentUser() : undefined
        }

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.setState({
            title: `CampuSale`
        });
    }

    logout() {
        UserService.logout();
        this.state = {
            user: UserService.isAutehnticated() ? UserService.getCurrentUser() : undefined
        }

        // Re-render component after sign-out does not work properly
        // if(this.props.location.pathname != '/') {
        //     this.props.history.push('/');
        // }
        // else {
        //     window.location.reload();
        // }
    }

    onFiltered(filterCriteria) {
        this.props.onFiltered(filterCriteria);
    }

    render() {
        if (this.state.user) {
            return(
                <section>
                    <AuthorizedHeader 
                        user = {this.state.user}
                        onLogout = {this.logout}
                        onFiltered = {(filterCriteria) => this.onFiltered(filterCriteria)}
                    />
                        {this.props.children}
                    <Footer/>
                </section>
            )
        } else {
            return(
                <section>
                    <Header/>
                        {this.props.children}
                    <Footer/>
                </section>)
        }
    }
}