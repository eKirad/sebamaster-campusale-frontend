// React imports
import React from 'react';
import { withRouter } from 'react-router-dom';
import Redirect from 'react-router-dom';

// Component imports
import Header from './Header';
import { Footer } from './Footer';

// Service imports
import UserService from '../services/UserService';
import CategoryService from '../services/CategoryService';

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

    render() {
        return(
            <section>
                <Header
                    props = {this.props}
                    user = {this.state.user}
                    onAddNewCategory = {(newCategory) => this.handleAddNewCategory(newCategory)}
                    onFilterByKeyword = {this.props.onFilterByKeyword}
                />
                <div className="main-content">
                    {this.props.children}
                </div>
                <Footer
                    props = {this.props}
                    user = {this.state.user}
                />
            </section>
        );
    }
}