// React importss
import React from 'react';

// Component imports
import { Wishlist } from '../components/Wishlist';
import { Loading } from '../components/Loading';

// Service imports
import WishlistService from "../services/WishlistService";
import UserService from "../services/UserService";

export class WishlistView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            items: [ ],
            user : {}
        }
        this.handleDeleteWishlistItem = this.handleDeleteWishlistItem.bind(this);
    };

    componentDidMount() {
        this.setState({
            loading: true,
            user: UserService.getCurrentUser()
        });
        // Get all the items
        WishlistService.getWishlistItems()
            .then((wishlist) => {
                this.setState({
                    items: wishlist.items,
                    loading: false
                })
            })
            .catch(e => { console.error(e); });
    }

    handleDeleteWishlistItem(itemId) {
        WishlistService.deleteItemFromWishlist(itemId)
            .then(() => {
                let items = this.state.items;
                for(let i=0;i<items.length;i++)
                {
                    if(items[i]._id === itemId)
                    {
                        items.splice(i,1);
                        break;
                    }
                }
                this.setState({
                    items: items,
                    loading: false
                })
            })
            .catch(e => { console.error(e); });
    }

    render() {
        if (this.state.loading) {
            return (<Loading/>);
        }
        return <Wishlist
            props={this.props}
            user={this.state.user}
            items={this.state.items}
            handleDeleteWishlistItem={this.handleDeleteWishlistItem.bind(this)}
        />;
    }
}