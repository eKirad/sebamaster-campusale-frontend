// React imports
import React from 'react';



// Component imports
import Page from '../components/Page';
import { PartnerDashboard } from '../components/PartnerDashboard'



export class PartnerDashboardView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Page>
                <PartnerDashboard/>
            </Page>
        );
    }
}