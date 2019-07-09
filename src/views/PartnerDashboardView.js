// React imports
import React from 'react';

// Component imports
import Page from '../components/Page';
import { PartnerDashboard } from '../components/PartnerDashboard'
import { Loading } from '../components/Loading';

// Service imports
import PartnerService from '../services/PartnerService';
import UserService from '../services/UserService'

export class PartnerDashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            partners: [ ],
            user: UserService.isAutehnticated() ? UserService.getCurrentUser() : undefined,
            loading: true
        }
    }

    componentDidMount() {
        // Get all partners
        PartnerService.getAllPartners(this.state.user.role)
            .then((partners) => {
                this.setState({
                    partners: partners,
                    loading: false
                })
            })
            .catch(e => { console.error(e); });
    }


    render() {

        if (this.state.loading) {
           return(
            <Loading/>
           );
        } else {
            return(
                <Page>
                    <PartnerDashboard
                        partners = {this.state.partners}
                    />
                </Page>
            );
        }
    }
}