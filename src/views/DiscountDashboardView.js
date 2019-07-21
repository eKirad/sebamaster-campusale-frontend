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
            discounts: [],
            currentDiscount: {
                id: "",
                name: "",
                amountInPercentage: undefined,
                bulkAmount: undefined,
            },
            message: {
                text: "",
                color: "red"
            },
            currentUser: UserService.isAutehnticated() ?
                UserService.getCurrentUser() : undefined,
            loading: true
        }

        this.handleDeleteDiscount = this.handleDeleteDiscount.bind(this);
        this.handleAddDiscount = this.handleAddDiscount.bind(this);
        this.handleUpdateDiscount = this.handleUpdateDiscount.bind(this);
        this.onAddDiscount = this.onAddDiscount.bind(this);
        this.onUpdateDiscount = this.onUpdateDiscount.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onFilterByKeyword = this.onFilterByKeyword.bind(this);
    }

    componentDidMount() {
        // Get all the discounts of the corresponding partner
        DiscountService
            .getPartnerDiscounts()
            .then((discounts) => {
                this.setState({
                    discounts: discounts,
                    loading: false
                })
            })
            .catch(e => {
                console.error(e);
            });
    }

    onUpdateDiscount(discountId) {
        console.log(discountId)
        let discount;
        console.log(this.state.discounts)
        for (let i = 0; i < this.state.discounts.length; i++) {
            console.log(this.state.discounts[i]._id)

            if (this.state.discounts[i]._id === discountId) {
                console.log("girdim")
                discount = {
                    id: discountId,
                    name: this.state.discounts[i].name,
                    amountInPercentage: this.state.discounts[i].amountInPercentage,
                    bulkAmount: this.state.discounts[i].bulkAmount,
                }
                break;
            }
        }

        console.log("discount: " + discount)
        this.setState({currentDiscount: discount});
    }

    onAddDiscount() {
        let currentDiscount = {
            id: "",
            name: "",
            amountInPercentage: undefined,
            bulkAmount: undefined,
        }
        this.setState({currentDiscount})
    }

    handleDeleteDiscount(discountId) {
        DiscountService
            .deleteDiscount(discountId)
            .then(() => {
                let message = {
                    text: "Discount removed successfully!",
                    color: "green"
                }
                this.setState({message})
            })
            .catch((e) => {
                let message = {
                    text: e,
                    color: "red"
                }
                this.setState({message})
            });
    }

    handleAddDiscount() {
        let currDiscount = this.state.currentDiscount;
        DiscountService
            .addDiscount({
                name: currDiscount.name,
                amountInPercentage: currDiscount.amountInPercentage,
                bulkAmount: currDiscount.bulkAmount,
                partnerId: this.state.currentUser.partnerId
            })
            .then((newDiscount) => {
                let discounts = this.state.discounts;
                discounts.push(newDiscount)
                this.setState({discounts})
                let message = {
                    text: "Discount added successfully!",
                    color: "green"
                }
                this.setState({message})
            })
            .catch((e) => {
                let message = {
                    text: e,
                    color: "red"
                }
                this.setState({message})
            });
    }

    handleUpdateDiscount() {
        DiscountService
            .updateDiscount(this.state.currentDiscount)
            .then((newDiscount) => {
                let discounts = this.state.discounts
                for(let i=0;i<discounts.length;i++)
                {
                    if(discounts[i]._id === newDiscount._id){
                        discounts[i] = newDiscount
                        break;
                    }
                }
                this.setState({discounts});
                let message = {
                    text: "Discount updated successfully!",
                    color: "green"
                }
                this.setState({message})
            })
            .catch(e => {
                let message = {
                    text: e,
                    color: "red"
                }
                this.setState({message})
            })
    }

    handleInputChange(e) {

        let currentDiscount = this.state.currentDiscount;
        currentDiscount[e.target.name] = e.target.value;
        this.setState({currentDiscount});
        console.log(this.state.currentDiscount)
    }

    filterItemsBySearchKeyword(keyword) {
        this.props.history.push(`/?search=${keyword}`);
    }

    onFilterByKeyword(filterCriteria) {
        this.filterItemsBySearchKeyword(filterCriteria);
    }

    render() {
        if (this.state.loading) {
            return (<Loading/>);
        }
        console.log(this.state.currentDiscount)
        return (
            <DiscountDashboard
                props={this.props}
                currentUser={this.state.currentUser}
                currentDiscount={this.state.currentDiscount}
                discounts={this.state.discounts}
                message={this.state.message}
                handleAddDiscount={this.handleAddDiscount}
                handleUpdateDiscount={this.handleUpdateDiscount}
                handleInputChange={this.handleInputChange}
                onDeleteDiscount={this.handleDeleteDiscount}
                onAddDiscount={this.onAddDiscount}
                onUpdateDiscount={this.onUpdateDiscount}
                onFilterByKeyword={this.onFilterByKeyword}
            />
        );
    }
}