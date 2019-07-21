// React imports
import React, { useState } from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


// Component imports
import Page from './Page';

export const BecomePartner = ({ onSubmitPartner }) => {
    const [partner, setPartner] = useState({ });

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitPartner(partner);
    }

    const handleChangeCompanyName = (event) => {
       // Set the isApproved flag to false
       setPartner({
            ...partner,
            name: event.target.value,
            isApproved: false
        });
    }

    const handleChangeContactPersonFirstName = (event) => {
        setPartner({
            ...partner,
            contactPersonFirstName: event.target.value
        });
    }

    const handleChangeContactPersonSurname = (event) => {
        setPartner({
            ...partner,
            contactPersonSurname: event.target.value
        });
    }

    const handleChangeContactPersonEmail = (event) => {
        setPartner({
            ...partner,
            contactPersonEmail: event.target.value
        });
    }

    const handleChangeLocation = (event) => {
        setPartner({
            ...partner,
            location: event.target.value
        });
        console.log(partner)
    }

    const validateTextFields = () => {
            return (partner.contactPersonFirstName === undefined || partner.contactPersonFirstName === ``
                || partner.contactPersonSurname === undefined ||  partner.contactPersonSurname === ``
                || partner.contactPersonEmail === undefined ||  partner.contactPersonEmail === ``
                ) ? true : false;
    }

    return(
        <Page>
            <ValidatorForm className="md-grid" onSubmit={handleSubmit}>
                <Card className="submit-card">
                <CardHeader title="Become a partner"></CardHeader>
                    <CardContent>
                    <TextValidator
                            label="Company name"
                            id="partnerCompanyName"
                            name="companyName"
                            value={partner.name}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            type="text"
                            onChange={handleChangeCompanyName}
                            /> <br/>
                    <TextValidator
                            label="First name"
                            id="partnerContactPersonFirstName"
                            name="firstName"
                            value={partner.contactPersonFirstName}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            type="text"
                            onChange={handleChangeContactPersonFirstName}
                            /> <br/>
                    <TextValidator
                            label="Surname"
                            id="partnerContactPersonSurname"
                            name="surname"
                            value={partner.contactPersonSurname}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            type="text"
                            onChange={handleChangeContactPersonSurname}
                            /> <br/>
                    <TextValidator
                            label="Contact email"
                            id="partnerContactPersonEmail"
                            name="email"
                            value={partner.contactPersonEmail}
                            validators={['required', 'isEmail']}
                            errorMessages={['This field is required', 'Email is not valid']}
                            type="text"
                            onChange={handleChangeContactPersonEmail}
                            /> <br/>
                    <TextValidator
                            label="Location"
                            id="partnerLocation"
                            name="location"
                            value={partner.location}
                            validators={['required']}
                            errorMessages={['This field is required']}
                            type="text"
                            onChange={handleChangeLocation}
                            /> <br/>
                    <Button
                            id = "submittBtn"
                            type = "submit"
                            disabled = {validateTextFields()}
                        >
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </ValidatorForm>
        </Page>
    );
}

