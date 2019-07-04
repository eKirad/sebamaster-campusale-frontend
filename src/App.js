// React imports
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// View imports
import { ItemListCategoryView } from './views/ItemListCategoryView';
import { ItemDetailView } from './views/ItemDetailView';
import { UserLoginView } from './views/UserLoginView';
import { UserSignupView } from './views/UserSignupView';
import { UserProfileView } from './views/UserProfileView';
import { WishlistView } from './views/WishlistView';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'CampuSale',
            routes: [
                { component: ItemListCategoryView, path: '/', exact: true },
                { component: ItemDetailView, path: '/item/:id' },
                { component: UserLoginView, path: '/login' },
                { component: UserSignupView, path: '/signup' },
                { component: UserProfileView, path: '/profile/:id' },
                { component: WishlistView, path: '/wishlist/:id' },
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