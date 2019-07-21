// React imports
import React from 'react';

// Component imports
import { AddItem } from '../components/AddItem';
import { Loading } from '../components/Loading';

// Service imports
import CategoryService from '../services/CategoryService';
import UserService from '../services/UserService';
import ItemService from '../services/ItemService';
import DiscountService from '../services/DiscountService';

export class AddItemView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [ ],
            item : {},
            partnerDiscounts: [ ],
            loading: true,
            currentUser:  UserService.isAutehnticated() ? 
            UserService.getCurrentUser() : undefined
        }

        this.onFilterByKeyword = this.onFilterByKeyword.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);

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

                    // Get all the discounts of the corresponding partner
        DiscountService
            .getPartnerDiscounts()
            .then((discounts) => {
                this.setState({
                    partnerDiscounts: discounts,
                    loading: false
                })
            })
            .catch(e => { console.error(e); });
    }

    handleInputChange(e) {

        let item = this.state.item;
        item[e.target.name] = e.target.value;
        this.setState({item});
        console.log(this.state.item)
    }
    handleFileChange(e) {

        let item = this.state.item;
        item.image = e.target.files[0];
        this.setState({item});
        console.log(this.state.item)
    }
    addItem(e) {
        e.preventDefault();
        // Get the partnerId property from the current user and set it to the item, so that 
        // the item gets linked to the corresponding partner
        let item = this.state.item;
        item.partnerId = this.state.currentUser.partnerId;
        console.log(item)
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

    filterItemsBySearchKeyword(keyword) {
        this.props.history.push(`/?search=${keyword}`);   
    }

    onFilterByKeyword(filterCriteria) {
        this.filterItemsBySearchKeyword(filterCriteria);
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
                item = {this.state.item}
                categories={filteredCategories}
                discounts={this.state.partnerDiscounts}
                handleInputChange = {this.handleInputChange}
                handleFileChange = {this.handleFileChange}
                onFilterByKeyword = {this.onFilterByKeyword}
                onAddItem={this.addItem}
            />
        );
    }
}