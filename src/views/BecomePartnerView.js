// React imports
import React from 'react';

// Component imports
import {BecomePartner} from '../components/BecomePartner';

// Service imports
import PartnerService from '../services/PartnerService';

export class BecomePartnerView extends React.Component {
    constructor(props) {
        super(props);

        this.handleCreatePartner = this.handleCreatePartner.bind(this);
    }

    handleCreatePartner(partner) {
        PartnerService
            .createPartner(partner.name, partner.isApproved, partner.contactPersonFirstName,
                partner.contactPersonSurname, partner.contactPersonEmail, partner.location)
            .then((data) => {
                this.props.history.push('/');
            })
            .catch((e) => {
                console.error(e);
                this.setState = {
                    error: e
                }
            });
    }

    render() {
        return(
            <BecomePartner
                onSubmitPartner={this.handleCreatePartner}
            />
        );
    }
}