// React imports
import React from 'react';

// Component imports
import { SimpleSelect } from './SimpleSelect';

export const Category = ({ categories }) => {
    const data = {
        isEnabled: true,
        label: `Categories`,
        data: categories
    }

    return (
        <SimpleSelect data = {data}/>
    );
};