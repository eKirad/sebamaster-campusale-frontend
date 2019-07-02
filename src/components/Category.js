// React imports
import React from 'react';

// Component imports
import { SimpleSelect } from './Select';

export const Category = ({ categories }) => {
    return (
        <SimpleSelect categories = {categories}/>
    );
};