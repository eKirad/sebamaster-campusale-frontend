// React imports
import React from 'react';

// Component imports
import Header from './Header';
import Footer from './Footer';

export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ``
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
                <Header/>
                {this.props.children}
                <Footer/>
            </section>
        )
    }
}