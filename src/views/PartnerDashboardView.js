// React imports
import React from 'react';

// Component imports
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

        this.onFilterByKeyword = this.onFilterByKeyword.bind(this);
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

    /*deleteApprovedPartner(approvedPartner) {
        PartnerService
    }*/


    onApproveAndRegisterPartner(partnerToApproveAndRegister) {
        // Change partner flag to isApproved = true
        PartnerService.updatePartner(partnerToApproveAndRegister)

        // Register partner as user of the platform
        const partnerUser = {
            username: `${partnerToApproveAndRegister.contactPersonFirstName}_${partnerToApproveAndRegister.contactPersonSurname}@${partnerToApproveAndRegister.name}`,
            password: `${partnerToApproveAndRegister.contactPersonFirstName}_${partnerToApproveAndRegister.contactPersonSurname}@${partnerToApproveAndRegister.name}`,
            email: `${partnerToApproveAndRegister.contactPersonEmail}`,
            role: `partner`,
            partnerId: partnerToApproveAndRegister._id
        };

        UserService.registerPartnerAsUser(partnerUser.username, partnerUser.password, 
            partnerUser.email, partnerUser.role, partnerUser.partnerId)
            .then((data) => {
                // Update isApproved partner flag to true
                PartnerService.updatePartner(partnerToApproveAndRegister)
                    .then((data) => {
                        if(this.props.location.pathname != '/partner-dashboard') {
                            this.props.history.push('/partner-dashboard');
                            window.location.reload();
                        } else {
                            window.location.reload();
                        }
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

    filterItemsBySearchKeyword(keyword) {
        this.props.history.push(`/?search=${keyword}`);   
    }

    onFilterByKeyword(filterCriteria) {
        this.filterItemsBySearchKeyword(filterCriteria);
    }

    render() {

        if (this.state.loading) {
           return(
            <Loading/>
           );
        } else {
            return(
                    <PartnerDashboard
                        props = {this.props}
                        partners = {this.state.partners}
                        onFilterByKeyword = {this.onFilterByKeyword}
                        onApproveAndRegisterPartner = {(partnerToApproveAndRegister) => this.onApproveAndRegisterPartner(partnerToApproveAndRegister)}
                        onDeleteApprovedPartner = {(partnerToDelete) => this.deleteApprovedPartner(partnerToDelete)}
                    />
            );
        }
    }
}