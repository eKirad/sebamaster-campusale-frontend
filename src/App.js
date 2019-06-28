import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'CampuSale'
        }
    }


    componentDidMount(){
        document.title = this.state.title;

    }


    render() {
        return (
            <div>
                <p>Jeko</p>
            </div>
        )
    }
}