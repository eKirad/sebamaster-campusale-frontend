// React imports
import React from 'react';

// Component imports
import {BecomePartner} from '../components/BecomePartner';

// Service imports
import PartnerService from '../services/PartnerService';

export class BecomePartnerView extends React.Component {
    constructor(props) {
        super(props);
    }

    createPartner(partner) {
        PartnerService
            .createPartner(partner.name, partner.isApproved, partner.contactPersonFirstName,
                partner.contactPersonSurname, partner.contactPersonEmail, partner.location)
            .then((data) => {
                console.log('data');
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
                onSubmit = {(partner) => this.createPartner(partner)}
            />
        );
    }
}