// React imports
import React from 'react';

// Component imports
import {DiscountDashboard} from '../components/DiscountDashboard';
import {Loading} from '../components/Loading';

// Service imports
import DiscountService from '../services/DiscountService';
import ItemService from '../services/ItemService';
import UserService from '../services/UserService';

export class DiscountDashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partnerDiscounts: [ ],
            partnerItems: [ ],
            currentUser: UserService.isAutehnticated() ? 
                UserService.getCurrentUser() : undefined,
            loading: true
        }

        this.handleDeleteDiscount = this.handleDeleteDiscount.bind(this);
        this.handleAddDiscount = this.handleAddDiscount.bind(this);
    }

    onSelectedDiscount(selectedDiscountId, selectedItems) {
        ItemService
            .setItemDiscount(selectedDiscountId, selectedItems)
            .then((discounts) => {
            })
            .catch(e => { console.error(e); });
    }

    componentDidMount() {
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

        // Get all the items of the corresponding partner
        ItemService
            .getPartnerItems()
            .then((items) => {
                this.setState({
                    partnerItems: items,
                    loading: false
                })
            })
            .catch(e => { console.error(e); });
    }

    handleDeleteDiscount(discountId) {
        DiscountService
            .deleteDiscount(discountId)
            .then(() => { 
                if (this.props.location.pathname !== '/discount-dashboard') {
                    this.props.history.push('/discount-dashboard');
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            })
            .catch((e) => { console.error(e); });
    }

    handleAddDiscount(newDiscount) {
        DiscountService
            .addDiscount(newDiscount)
            .then((newDiscount) => { 
                if (this.props.location.pathname !== '/discount-dashboard') {
                    this.props.history.push('/discount-dashboard');
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            })
            .catch((e) => { console.error(e); });    
    }


    render() {
        if (this.state.loading) {
            return (<Loading/>);
        }

        return(
            <DiscountDashboard
                props={this.props}
                currentUser={this.state.currentUser}
                discounts={this.state.partnerDiscounts}
                onSelectedDiscount={(selectedDiscount, selectedItems) => this.onSelectedDiscount(selectedDiscount, selectedItems)}
                onDeleteDiscount={this.handleDeleteDiscount}
                onAddDiscount={this.handleAddDiscount} 
                items={this.state.partnerItems}
            />
        );
    }
}