// React imports
import React from 'react';

// Component imports
import { SimpleSelect } from './SimpleSelect';

export const Category = ({categories, onSelectedCategory}) => {
    const data = {
        isEnabled: true,
        label: `Categories`,
        data: categories
    }

    const onSelect = (selectedOption) => {
        console.log(`Inside onSelect() in Category`)
        console.log(selectedOption);
        onSelectedCategory(selectedOption);
    }

    return (
        <SimpleSelect 
            data = {data} 
            onSelect = {(selectedOption) => onSelect(selectedOption)}
        />
    );
};