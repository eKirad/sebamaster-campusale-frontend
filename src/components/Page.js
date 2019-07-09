// React imports
import React from 'react';
import { withRouter } from 'react-router-dom';
import Redirect from 'react-router-dom';

// Component imports
import Header from './Header';
import { Footer } from './Footer';
import { AuthorizedHeader } from './AuthorizedHeader';
import { AuthorizedFooter } from './AuthorizedFoooter';

// Service imports
import UserService from '../services/UserService';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ``,
            user: UserService.isAutehnticated() ? UserService.getCurrentUser() : undefined
        }
    }

    componentDidMount() {
        this.setState({
            title: `CampuSale`
        });
    }

    onFiltered(filterCriteria) {
        this.props.onFiltered(filterCriteria);
    }

    render() {
        if (this.state.user) {
            return(
                <section>
                    <AuthorizedHeader
                        props = {this.props} 
                        user = {this.state.user}
                        onFiltered = {(filterCriteria) => this.onFiltered(filterCriteria)}
                    />
                        {this.props.children}
                    <Footer
                        user = {this.state.user}
                    />
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