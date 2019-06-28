// React imports
import React from 'react';

// Component imports
// import { SimpleSelect } from './Select';

export const Category = ({ categories }) => {
    console.log(`sdadasasdasdl;;asd`);
    
    console.log(categories);
    
    // return (
    //     <SimpleSelect categories = {categories}/>
    // );

    return(
        <div>
            {categories.map((category) => (
                <p key = {category.name}>
                    {category.name}
                </p>
            ))}
        </div>
    );

};