// React imports
import React from 'react';

// Component imports
import { SimpleSelect } from './SimpleSelect';

export const Category = ({categories, onSelect}) => {
    // Set the AllCategories option to be markable
    categories
        .forEach(category => {
            if (category.name === `All categories` && category.description === `all categories`) {
                category._id = `allCategories`;
            }
        });
    
    const data = {
        isEnabled: true,
        label: `Categories`,
        data: categories
    }

    return (
        <SimpleSelect 
            data={data} 
            onSelect={onSelect}
        />
    );
};