// Default imports
import React from 'react';

// Componenet imports
import { ItemDetail } from '../components/ItemDetail';
import { Loading } from '../components/Loading';

// Service imports
import ItemService from '../services/ItemService';
import WishlistService from '../services/WishlistService';

export class ItemDetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: undefined,
            loading: true,
            items: [ ],
            itemInWishlist: false
        }

        this.onWishlistClick = this.onWishlistClick.bind(this);
        this.onFilterByKeyword = this.onFilterByKeyword.bind(this);
    }

    componentDidMount() {
        const itemId = this.props.match.params.id;
        
        ItemService.getItem(itemId)
            .then((item) => {
                this.setState({ 
                    item: item,
                    loading: false
                });
            })
            .catch(e => { console.error(e); });

        WishlistService.checkIfItemInWishlist(itemId)
            .then((item) => {
                this.setState({
                    itemInWishlist: true
                });
            })
            .catch(e => { console.error(e); });
    }

    filterItemsBySearchKeyword(keyword) {
        this.props.history.push(`/?search=${keyword}`);   
    }

    onFilterByKeyword(filterCriteria) {
        this.filterItemsBySearchKeyword(filterCriteria);
    }

    onWishlistClick() {
        let itemInWishlist = this.state.itemInWishlist;
        if (itemInWishlist) {
            WishlistService.deleteItemFromWishlist(this.props.match.params.id)
                .then((item) => {
                    this.setState({itemInWishlist: false})
                })
                .catch(e => { console.error(e); });
        } else {
            WishlistService.addItemToWishlist(this.props.match.params.id)
                .then((item) => {
                    this.setState({itemInWishlist: true})
                })
                .catch(e => { console.error(e); });
        }
    }
    
    render() {
        if (this.state.loading) {
            return (<Loading/>);
        }

        return (
            <ItemDetail 
                item = {this.state.item}
                onFilterByKeyword = {this.onFilterByKeyword}
                onWishlistClick = {this.onWishlistClick.bind(this)}
                itemInWishlist = {this.state.itemInWishlist}
            />
        );
    }
}
