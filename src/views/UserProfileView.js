// React imports
import React from 'react';

// Component imports
import { UserProfile } from '../components/UserProfile';

export  class UserProfileView extends React.Component {
    constructor(props) {
        super(props);
        console.log(`Inside UserProfileView`);
    }


    render() {
        return(
            <UserProfile/>
        );
    }
}