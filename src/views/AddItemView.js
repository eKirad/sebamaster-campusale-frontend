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
        console.log(`Inside addItem of AddItemView`);
        console.log(this.state.currentUser);
        const arr = this.state.currentUser.username
            .split('_');
        const partnerId = arr[arr.length - 1];
        console.log(partnerId);
        item.partnerId = partnerId;
        console.log(item)
        ItemService
            .addItem(item)
            .then((data) => {
                console.log('data');
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

        const filteredCategories = this.state.categories
            .filter(category => category.name !== `All categories`)
        return(
            <AddItem
                categories = {filteredCategories}
                onAddItem = {(item) => this.addItem(item)}
            />
        );
    }
}