// React importss
import React from 'react';

// Component imports
import { ItemListCategory } from '../components/ItemListCategory';
import { Loading } from '../components/Loading';

// Service imports
import ItemService from '../services/ItemService';
import { CategoryService } from '../services/CategoryService';


export class ItemListCategoryView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            items: [ ],
            categories: [ ]
        }
    };


    componentDidMount() {
        this.setState({
            loading: true
        });

        ItemService.getAllItems()
        .then((items) => {
            console.log(items)
            this.setState({
                items: items,
                loading: false
            })
        })
        .catch(e => { console.error(e); });

        CategoryService.getCategories()
        .then((categories) => {
            console.log(categories)
            this.setState({
                categories: categories,
            })
        })
        .catch(e => { console.error(e); });
    }


    render() {
        console.log('here' + this.state.items);

        if (this.state.loading) {
            return (<Loading/>);
        } 

        return <ItemListCategory items = {this.state.items} categories = {this.state.categories}/>;
    }
}