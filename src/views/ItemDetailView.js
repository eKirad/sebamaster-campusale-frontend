// Default imports
import React from 'react';

// Componenet imports
import { ItemDetail } from '../components/ItemDetail';
import { Loading } from '../components/Loading';

// Service imports
import ItemService from '../services/ItemService';

export class ItemDetailView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: undefined,
            loading: true,
            items: [ ]
        }
    }

    componentDidMount() {
        const itemId = this.props.match.params.id;
        console.log(itemId)
        console.log('inside ItemDetailView componentDidMount')
        
        ItemService.getItem(itemId)
            .then((item) => {
                this.setState({ 
                    item: item,
                    loading: false
                });
            })
            .catch(e => { console.error(e); });
    }

    filterItemsBySearchKeyword(keyword) {
        console.log(`Inside the filterItemsBySearchKeyword method inside the ItemListCategory`);
        console.log(`this is the keyword = ${keyword}`);
        this.state.items = this.state.items
            .filter(item => item.name.toLowerCase().includes(keyword));

        this.props.history.push('/');
    }

    onFilter(filterCriteria) {
        console.log(`Inside the ItemListCategory view to check the filter criteria`);
        console.log(`The filter criteria is = ${filterCriteria}`);
        this.filterItemsBySearchKeyword(filterCriteria);
    }


    render() {
        
        if (this.state.loading) {
            return (<Loading/>);
        }

        return (
            <ItemDetail 
                item = {this.state.item}
                onFilter = {(filterCriteria) => this.onFilter(filterCriteria)}
            />
        );
    }
}
