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

        PartnerService.getAllPartners()
            .then((partners) => {
                this.setState({
                    partners: partners
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

    filterByPartners(partnersIds) {
        console.log(`FilterByPartners`)        
        console.log(partnersIds);
        partnersIds
            .forEach(partnerId => {
                this.state.items = this.state.items
                    .filter(item => item.partnerId === partnerId);
            });
    }

    filterItemsBySearchKeyword(keyword) {
        console.log(`Inside the filterItemsBySearchKeyword method inside the ItemListFilter`);
        console.log(`this is the keyword = ${keyword}`);
        this.state.items = this.state.items
            .filter(item => item.name.toLowerCase().includes(keyword));

        this.props.history.push('/');
    }

    onSelectCategory(selectedCategory) {
        console.log(`Inside onSelectCategory() in the ItemListFilterView`)
        console.log(selectedCategory);
        this.setState({
            selectedCategoryId: selectedCategory.value, 
        })
        this.filterItemsByCategory(selectedCategory.value);
        this.props.history.push('/');
    }

    onFilter(filterCriteria) {
        this.filterItemsBySearchKeyword(filterCriteria);
    }

    onSelectPartner(selectedPartners) {
 
        if (selectedPartners.length !== 0) {
            // If a brand is selected --> check if there is any selected category
            if (this.state.selectedCategoryId !== undefined) {
                // There is an already selected category --> filter according to the selected
                // brand & category
                const partnersArr = [ ];
                selectedPartners
                    .forEach(partnerObj => {
                        partnersArr.push(partnerObj._id);
                    });
                this.filterItemsByCategory(this.state.selectedCategoryId);
                this.filterByPartners(partnersArr);
                this.props.history.push('/');

            } else {
                // There is no selected category --> filter according to the selected brand
                const partnersArr = [ ];
                selectedPartners
                    .forEach(partnerObj => {
                        partnersArr.push(partnerObj._id);
                    });
                this.filterByPartners(partnersArr);
                this.props.history.push('/');
            }
            

        } else if (selectedPartners.length === 0) {
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
            onSelectCategory = {(selectedCategory) => this.onSelectCategory(selectedCategory)}
            onSelectPartner = {(selectedPartner) => this.onSelectPartner(selectedPartner)}
            onFilter = {(filterCriteria) => this.onFilter(filterCriteria)}
        />;
    }
}