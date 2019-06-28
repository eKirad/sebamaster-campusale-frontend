// React imports
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// View imports
import { ItemListCategoryView } from './views/ItemListCategoryView';
import { ItemDetailView } from './views/ItemDetailView';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'CampuSale',
            routes: [
                { component: ItemListCategoryView, path: '/', exact: true },
                { component: ItemDetailView, path: '/item/:id' },
            ]
        }
    }


    componentDidMount(){
        document.title = this.state.title;

    }


    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => <Route key={i} {...route}/>)}
                    </Switch>
                </Router>
            </div>
        );
    }
}