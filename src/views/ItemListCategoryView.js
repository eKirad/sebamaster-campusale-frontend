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
            initialItems: [ ],
            categories: [ ]
        }

        console.log(`The props inherited by App`)
        console.log(this.props.history)
    };


    componentDidMount() {
        this.setState({
            loading: true
        });

        ItemService.getAllItems()
        .then((items) => {
            this.setState({
                items: items,
                initialItems: items,
                loading: false
            })
        })
        .catch(e => { console.error(e); });

        CategoryService.getCategories()
        .then((categories) => {
            this.setState({
                categories: categories,
            })
        })
        .catch(e => { console.error(e); });
    }


    filterItemsByCategory(id) {
        console.log(id);
        if (id === `allCategories`) {
            console.log(`yes`)
            this.state.items = [ ];
            this.state.initialItems
                .forEach(item => {
                    this.state.items.push(item);
                });
        } else {
            this.state.items = this.state.initialItems
                .filter(item => item.categoryId === id);
        }

    }

    onSelectCategory(selectedCategory) {
        console.log(`Inside onSelectCategory() in the ItemListCategoryView`)
        console.log(selectedCategory);
        this.filterItemsByCategory(selectedCategory.value);
        this.props.history.push('/');
    }


    render() {
        if (this.state.loading) {
            return (<Loading/>);
        } 

        return <ItemListCategory 
            items = {this.state.items} 
            categories = {this.state.categories}
            props = {this.props}
            onSelectCategory = {(selectedCategory) => this.onSelectCategory(selectedCategory)}
        />;
    }
}