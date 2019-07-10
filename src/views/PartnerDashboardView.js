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

    deleteApprovedPartner(approvedPartner) {
        PartnerService
    }


    onApproveAndRegisterPartner(partnerToApproveAndRegister) {
        // Change partner flag to isApproved = true
        // PartnerService.updatePartner(partnerToApproveAndRegister)


        // Register partner
        const partnerUser = {
            username: `${partnerToApproveAndRegister.contactPersonFirstName}_${partnerToApproveAndRegister.contactPersonSurname}_${partnerToApproveAndRegister.name}_${partnerToApproveAndRegister._id}`,
            password: `${partnerToApproveAndRegister.contactPersonFirstName}_${partnerToApproveAndRegister.contactPersonSurname}@${partnerToApproveAndRegister.name}`,
            email: `${partnerToApproveAndRegister.contactPersonEmail}`,
            role: `partner`
        };

        UserService.register(partnerUser.username, partnerUser.password, 
            partnerUser.email, partnerUser.role)
            .then((data) => {
                console.log('data');
                // Update isApproved partner flag to true
                PartnerService.updatePartner(partnerToApproveAndRegister)
                    .then((data) => {
                        this.props.history.push('/');
                    })
                    .catch((e) => {
                        console.error(e);
                        this.setState = {
                            error: e
                        }
                    });
            })
            .catch((e) => {
                console.error(e);
                this.setState = {
                    error: e
                }
            });
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
                        onApproveAndRegisterPartner = {(partnerToApproveAndRegister) => this.onApproveAndRegisterPartner(partnerToApproveAndRegister)}
                        onDeleteApprovedPartner = {(partnerToDelete) => this.deleteApprovedPartner(partnerToDelete)}
                    />
                </Page>
            );
        }
    }
}