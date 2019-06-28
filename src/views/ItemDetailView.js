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
            loading: true
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



    render() {
        
        if (this.state.loading) {
            return (<Loading/>);
        }

        return (
            <ItemDetail item = {this.state.item}/>
        );
    }
}
