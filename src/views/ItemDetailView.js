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
        this.state.items = this.state.items
            .filter(item => item.name.toLowerCase().includes(keyword));

        this.props.history.push('/');
    }

    onFilter(filterCriteria) {
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
