// React importss
import React from 'react';

// Component imports
import { ItemListFilter } from '../components/ItemListFilter';
import { Loading } from '../components/Loading';
import queryString from 'query-string';

// Service imports
import ItemService from '../services/ItemService';
import CategoryService from '../services/CategoryService';
import PartnerService from '../services/PartnerService';

export class ItemListFilterView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            items: [ ],
            initialItems: [ ],
            categories: [ ],
            isFilteredByCategory: false,
            selectedCategoryId: undefined,
            filteredByCategoryItems: [ ],
            filteredByPartnerItems: [ ],
            filteredByCategoryAndPartnerItems: [ ],
            filteredByPriceRangeItems: [ ],
            partners: [ ],
            isFilteredByPartner:false
        }

        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleSelectPartner = this.handleSelectPartner.bind(this);
        this.handleSelectPriceRange = this.handleSelectPriceRange.bind(this);
        this.handleEnterKeyword = this.filterItemsBySearchKeyword.bind(this);
    };

    componentDidMount() {
        // Get all the items
        ItemService
            .getAllItems()
            .then((items) => {
                this.setState({
                    items: items,
                    initialItems: items,
                    loading: false
                })
            })
            .catch(e => { console.error(e); });

        // Get all the categories
        CategoryService
            .getCategories()
            .then((categories) => {
                this.setState({
                    categories: categories,
                })
            })
            .catch(e => { console.error(e); });

        // Get 5 partners (select criteria based on partner priorities)
        PartnerService
            .getApprovedPartners()
            .then((approvedPartners) => {
                this.setState({
                    partners: approvedPartners
                })
            })
            .catch(e => { console.error(e); });


        
    }

    /**
     * Returns an object with the information if we have filtered by category or not(having selected 
     * all the categories counts as no filter on categories) as a first property and 
     * an array of all the filtered items as a second property
     * @param {The initial items} initialItems 
     * @param {The id of the category, that has been selected} categoryId 
     */
    filterItemsByCategory(initialItems, categoryId) {
        return categoryId === `allCategories` ? {
            isFilteredByCategory: false,
            filteredItems:this.state.initialItems} : {
                isFilteredByCategory: true,
                filteredItems: initialItems.filter((item) => item.categoryId === categoryId)
            }
    }

    filterItemsByCategoryAndPartner(initialItems, categoryId) {
        let isFromSameCategory = true;
        let obj = { 
            filteredItems: [ ]
        };

        if (categoryId !== `allCategories`) {
            obj.isFilteredByCategory = true;
            for (const initialItem of initialItems) {
                if (initialItem.categoryId !== categoryId) {
                    isFromSameCategory = false;
                    break;
                }
            }
        } else {
            obj.isFilteredByCategory = false;
        }

        if (isFromSameCategory) {
            initialItems
                .forEach(initialItem => {
                    obj.filteredItems.push(initialItem);
                });
        } 

        return obj;
    }

    filterItemsByPartner(initialItems, partnerId) {
        return {
            isFilteredByPartner: true,
            filteredItems: initialItems.filter((item) => item.partnerId === partnerId)
        }
    }

    filterItemsBySearchKeyword(keyword) {
        this.setState({
            items : this.state.initialItems
            .filter((item) => {
                const itemNameItemDescription = `${item.name}-${item.description}`;
                return (itemNameItemDescription.toLowerCase().includes(keyword.toLowerCase()))
            })
        }, () => console.log("ITEMS : ", this.state.items));

        this.props.history.push('/');
    }

    handleSelectCategory(selectedCategory) {
        const categoryId = selectedCategory.value;

        if (this.state.isFilteredByPartner) {
            const filteredItemsoObject = this.filterItemsByCategoryAndPartner(this.state.filteredByPartnerItems, categoryId);
            this.setState({
                items : filteredItemsoObject.filteredItems,
                filteredByCategoryItems: filteredItemsoObject.filteredItems,
                isFilteredByCategory: filteredItemsoObject.isFilteredByCategory,
                selectedCategoryId: categoryId
            }, () => console.log("ITEMS : ", this.state.items, this.state.isFilteredByCategory));
    
            this.props.history.push('/');
        } else {
            const filteredItemsoObject = this.filterItemsByCategory(this.state.initialItems, categoryId);
            this.setState({
                items : filteredItemsoObject.filteredItems,
                filteredByCategoryItems: filteredItemsoObject.filteredItems,
                isFilteredByCategory: filteredItemsoObject.isFilteredByCategory,
                selectedCategoryId: categoryId
            }, () => console.log("ITEMS : ", this.state.items, this.state.isFilteredByCategory));
    
            this.props.history.push('/');
        }
    }

    handleEnterKeyword(filterCriteria) {
        this.filterItemsBySearchKeyword(filterCriteria);
    }

    fitlerItemsByPriceRange(initialItems, minPrice, maxPrice) {
        
        initialItems
            .forEach((initialItem) => {
                initialItem.price = initialItem.price - initialItem.price * (initialItem.discount.amountInPercentage / 100)
            });
    }

    handleSelectPriceRange(minSelectedPrice, maxSelectedPrice) {
        // this.filterItemsByPriceRange(minSelectedPrice, maxSelectedPrice);
        console.log(minSelectedPrice, maxSelectedPrice)

        if (this.state.isFilteredByCategory) {
            if (this.state.isFilteredByPartner) {
                // Currently filtered by both category & partner
                const filteredItemsoObject = this.fitlerItemsByPriceRange(this.state.filteredByCategoryAndPartnerItems, 
                    minSelectedPrice, maxSelectedPrice);
                this.setState({
                    items : filteredItemsoObject.filteredItems,
                    filteredByPriceRangeItems: filteredItemsoObject.filteredItems,
                    isFilteredByPriceRange: filteredItemsoObject.isFilteredByPriceRange,
                }, () => console.log("ITEMS : ", this.state.items, this.state.isFilteredByPartner));
            } else {
                const filteredItemsoObject = this.fitlerItemsByPriceRange(this.state.filteredByCategoryItems, 
                    minSelectedPrice, maxSelectedPrice);
                this.setState({
                    items : filteredItemsoObject.filteredItems,
                    filteredByPriceRangeItems: filteredItemsoObject.filteredItems,
                    isFilteredByPriceRange: filteredItemsoObject.isFilteredByPriceRange,
                }, () => console.log("ITEMS : ", this.state.items, this.state.isFilteredByPartner));
            }
        } else {
            const filteredItemsoObject = this.fitlerItemsByPriceRange(this.state.initialItems, 
                minSelectedPrice, maxSelectedPrice);
            this.setState({
                items : filteredItemsoObject.filteredItems,
                filteredByPriceRangeItems: filteredItemsoObject.filteredItems,
                isFilteredByPriceRange: filteredItemsoObject.isFilteredByPriceRange,
            }, () => console.log("ITEMS : ", this.state.items, this.state.isFilteredByPartner));
        }
    }

    handleSelectPartner(selectedPartner) {
        if (selectedPartner) {
            const partnerId = selectedPartner._id;
            if (this.state.isFilteredByCategory) {
                const filteredItemsoObject = this.filterItemsByPartner(this.state.filteredByCategoryItems, 
                        partnerId);
                this.setState({
                    items : filteredItemsoObject.filteredItems,
                    filteredByCategoryAndPartnerItems: filteredItemsoObject.filteredItems,
                    filteredByPartnerItems: filteredItemsoObject.filteredItems,
                    isFilteredByPartner: true,
                }, () => console.log("ITEMS : ", this.state.items, this.state.isFilteredByPartner));
            } else {
                const filteredItemsoObject = this.filterItemsByPartner(this.state.items, partnerId);
                this.setState({
                    items : filteredItemsoObject.filteredItems,
                    filteredByPartnerItems: filteredItemsoObject.filteredItems,
                    isFilteredByPartner: true
                }, () => console.log("ITEMS : ", this.state.items, this.state.isFilteredByPartner));
            }  
        } else {
            if (this.state.isFilteredByCategory) {
                this.setState({
                    items : this.state.filteredByCategoryItems,
                    isFilteredByPartner: false
                }, () => console.log("ITEMS : ", this.state.items, this.state.isFilteredByCategory));
            } else {
                this.setState({
                    items : this.state.initialItems,
                    isFilteredByPartner: false
                }, () => console.log("ITEMS : ", this.state.items));
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (<Loading/>);
        }

        if (this.props.location.search) {
            this.filterItemsBySearchKeyword(queryString.parse(this.props.location.search).search)
        }

        return (
            <ItemListFilter 
                items={this.state.items} 
                categories={this.state.categories}
                partners={this.state.partners}
                props={this.props}
                onSelectCategory={this.handleSelectCategory}
                onSelectPartner={this.handleSelectPartner}
                onSelectPriceRange={this.handleSelectPriceRange}
                onFilterByKeyword={this.handleEnterKeyword}
        />);
    }
}