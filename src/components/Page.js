// React imports
import React from 'react';

// Component imports
import Header from './Header';
import Footer from './Footer';

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

    render() {
        console.log(`Is there any authorized user?`);
        console.log(`${ UserService.isAutehnticated() }`)
        console.log(this.state.user)
        return(
            <section>
                <Header/>
                {this.props.children}
                <Footer/>
            </section>
        )
    }
}