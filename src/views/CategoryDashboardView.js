// React imports
import React from 'react';

// Component imports
import {CategoryDashboard} from '../components/CategoryDashboard';
import {Loading} from '../components/Loading';

// Service imports
import CategoryService from '../services/CategoryService';

export class CategoryDashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [ ],
            loading: true
        }

        this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
        this.handleAddNewCategory = this.handleAddNewCategory.bind(this);
        this.onFilterByKeyword = this.onFilterByKeyword.bind(this);
    }

    componentDidMount() {
        CategoryService
            .getCategories()
            .then((categories) => { 
                this.setState({
                    categories: categories,
                    loading: false
                })
            })
            .catch((e) => { console.error(e); })
    }

    handleAddNewCategory(newCategory) {
        CategoryService
            .addCategory(newCategory)
            .then((newCategory) => { 
                if (this.props.location.pathname !== '/category-dashboard') {
                    this.props.history.push('/category-dashboard');
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            })
            .catch((e) => { console.error(e); });
    }

    handleDeleteCategory(categoryId) {
        CategoryService
            .deleteCategory(categoryId)
            .then(() => { 
                if (this.props.location.pathname !== '/category-dashboard') {
                    this.props.history.push('/category-dashboard');
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            })
            .catch((e) => { console.error(e); });
    }

    filterItemsBySearchKeyword(keyword) {
        this.props.history.push(`/?search=${keyword}`);   
    }

    onFilterByKeyword(filterCriteria) {
        this.filterItemsBySearchKeyword(filterCriteria);
    }

    render() {
        if (this.state.loading) {
            return(
                <Loading/>
            );
        }

        console.log(this.state.categories)
        return(
            <CategoryDashboard 
                props={this.props}
                categories={this.state.categories}
                onAddNewCategory={this.handleAddNewCategory}
                onDeleteCategory={this.handleDeleteCategory}
                onFilterByKeyword = {this.onFilterByKeyword}
            />
        );
    }
}