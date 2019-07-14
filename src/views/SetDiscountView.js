// React imports
import React from 'react';

// Component imports
import {SetDiscount} from '../components/SetDiscount';
import {Loading} from '../components/Loading';

// Service imports
import DiscountService from '../services/DiscountService';
import ItemService from '../services/ItemService';

export class SetDiscountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partnerDiscounts: [ ],
            partnerItems: [ ],
            loading: true
        }
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

    render() {
        if (this.state.loading) {
            return (<Loading/>);
        }

        return(
            <SetDiscount 
                discounts = {this.state.partnerDiscounts}
                onSelectedDiscount = {(selectedDiscount, selectedItems) => this.onSelectedDiscount(selectedDiscount, selectedItems)}
                items = {this.state.partnerItems}
            />
        );
    }
}   