// React imports
import React from 'react';

// Component imports
import { AddItem } from '../components/AddItem';
import { Loading } from '../components/Loading';

// Service imports
import CategoryService from '../services/CategoryService';
import UserService from '../services/UserService';
import ItemService from '../services/ItemService';

export class AddItemView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [ ],
            loading: true,
            currentUser:  UserService.isAutehnticated() ? 
            UserService.getCurrentUser() : undefined
        }
    }

    componentDidMount() {
        // Get all the categories
        CategoryService.getCategories()
            .then((categories) => {
                this.setState({
                    categories: categories,
                    loading: false
                })
            })
            .catch(e => { console.error(e); });
    }

    addItem(item) {
        // Get the partnerId property from the current user and set it to the item, so that 
        // the item gets linked to the corresponding partner 
        item.partnerId = this.state.currentUser.partnerId;

        ItemService
            .addItem(item)
            .then((data) => {
                this.props.history.push('/');
            })
            .catch((e) => {
                console.error(e);
                this.setState = {
                    error: e
                }
            });
    }

    render() {
        if (this.state.loading) {
            return(<Loading/>);
        }

        // Filter out the option all categories
        const filteredCategories = this.state.categories
            .filter(category => category.name !== `All categories`)
        return(
            <AddItem
                props={this.props}
                categories={filteredCategories}
                onAddItem={(item) => this.addItem(item)}
            />
        );
    }
}