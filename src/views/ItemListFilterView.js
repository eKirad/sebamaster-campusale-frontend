// React importss
import React from 'react';

// Component imports
import { ItemListFilter } from '../components/ItemListFilter';
import { Loading } from '../components/Loading';

// Service imports
import ItemService from '../services/ItemService';
import CategoryService from '../services/CategoryService';
import PartnerService from '../services/PartnerService';


export class ItemListFilterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            items: [ ],
            initialItems: [ ],
            categories: [ ],
            selectedCategoryId: undefined,
            partners: [ ]
        }
    };


    componentDidMount() {
        this.setState({
            loading: true
        });

        // Get all the items
        ItemService.getAllItems()
            .then((items) => {
                this.setState({
                    items: items,
                    initialItems: items,
                    loading: false
                })
            })
            .catch(e => { console.error(e); });

        // Get all the categories
        CategoryService.getCategories()
            .then((categories) => {
                this.setState({
                    categories: categories,
                })
            })
            .catch(e => { console.error(e); });

        // Get all the partners
        PartnerService.getAllPartners()
            .then((partners) => {
                this.setState({
                    partners: partners
                })
            })
            .catch(e => { console.error(e); });
    }


    filterItemsByCategory(id) {
        if (id === `allCategories`) {
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

    filterItemsByPartnerId(partnerId) {
        if (this.state.selectedCategoryId === undefined 
            || this.state.selectedCategoryId === `allCategories`) {
            this.state.items = this.state.initialItems
            .filter(item => item.partnerId === partnerId)
        } else {
            this.state.items = this.state.items
            .filter(item => item.partnerId === partnerId)
        }
    }

    filterItemsByCategoryIdAndPartnerId(categoryId, partnerId) {
        this.state.items = this.state.initialItems
            .filter(item => (item.categoryId === categoryId && item.partnerId === partnerId));
    }

    filterItemsBySearchKeyword(keyword) {
        this.state.items = this.state.items
            .filter(item => item.name.toLowerCase().includes(keyword));

        this.props.history.push('/');
    }

    filterItemsByPriceRange(minPrice, maxPrice) {
        // TODO
        this.state.items = this.state.items
            .filter(item => (item.newPrice >= minPrice && item.newPrice <= maxPrice));
        this.props.history.push('/');
    }

    handleSelectCategory(selectedCategory) {
        this.setState({
            selectedCategoryId: selectedCategory.value, 
        })
        this.filterItemsByCategory(selectedCategory.value);
        this.props.history.push('/');
    }

    handleEnterKeyword(filterCriteria) {
        this.filterItemsBySearchKeyword(filterCriteria);
    }

    handleSelectPriceRance(minSelectedPrice, maxSelectedPrice) {
        this.filterItemsByPriceRange(minSelectedPrice, maxSelectedPrice);
    }

    handleSelectPartner(selectedPartner) {
        if (selectedPartner) {
            // If a brand is selected --> check if there is any selected category
            if (this.state.selectedCategoryId !== undefined &&
                    this.state.selectedCategoryId !== `allCategories`) {
                // There is an already selected category --> filter according to the selected
                // brand & category
                this.filterItemsByCategoryIdAndPartnerId(this.state.selectedCategoryId,
                        selectedPartner._id);
                this.props.history.push('/');
            } else {
                // There is no selected category --> filter according to the selected brand
                console.log(`Hey, here I come again`)
                this.filterItemsByPartnerId(selectedPartner._id);
                this.props.history.push('/');
            }
        } else {
            // If no brand is selected --> check if there is any selected category 
            if (this.state.selectedCategoryId !== undefined) {
                // There is a selected category --> filter the items according to the
                // already selected category
                this.filterItemsByCategory(this.state.selectedCategoryId);
                this.props.history.push('/');
            } else {
                // There is no selected category --> display all the items
                this.state.items = this.state.initialItems;
                this.props.history.push('/');
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (<Loading/>);
        } 
        return <ItemListFilter 
            items = {this.state.items} 
            categories = {this.state.categories}
            partners = {this.state.partners}
            props = {this.props}
            onSelectCategory = {(selectedCategory) => this.handleSelectCategory(selectedCategory)}
            onSelectPartner = {(selectedPartner) => this.handleSelectPartner(selectedPartner)}
            onSelectPriceRange = {(minSelectedPrice, maxSelectedPrice) => this.handleSelectPriceRance(minSelectedPrice, maxSelectedPrice)}
            onEnterKeyword = {(filterCriteria) => this.handleEnterKeyword(filterCriteria)}
        />;
    }
}