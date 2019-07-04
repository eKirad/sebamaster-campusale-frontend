// React imports
import React from 'react';

// Component imports
import { SimpleSelect } from './SimpleSelect';

export const Category = ({categories, onSelectedCategory}) => {
    // Set the AllCategories option to be markable
    categories
        .forEach(category => {
            if (category.name === `All categories` && category.description === `All`) {
                category._id = `allCategories`;
            }
        });
    
    const data = {
        isEnabled: true,
        label: `Categories`,
        data: categories
    }

    const onSelect = (selectedOption) => {
        onSelectedCategory(selectedOption);
    }

    return (
        <SimpleSelect 
            data = {data} 
            onSelect = {(selectedOption) => onSelect(selectedOption)}
        />
    );
};