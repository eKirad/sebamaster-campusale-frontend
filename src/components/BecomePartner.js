// React imports
import React, { useState } from 'react';

// Material UI imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Component imports
import Page from './Page';

export const BecomePartner = ({ onSubmitPartner }) => {
    const [partner, setPartner] = useState({ });
    
    const cardStyle = {
        textAlign: 'center'
    }

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
    }

    return(
        <Page>
            <form className="md-grid" onSubmit = {handleSubmit}>
                <Card style = {cardStyle}>
                    <CardContent>
                        <Typography>
                            Thank you for becoming a partner ....
                        </Typography>
                        <TextField
                            label = "Company name"
                            id = "partnerCompanyName"
                            required = {true}
                            type = "text"
                            onChange = {handleChangeCompanyName}
                        /> <br/>
                        <TextField
                            label = "Contact person - first name"
                            id = "partnerContactPersonFirstName"
                            required = {true}
                            type = "text"
                            onChange = {handleChangeContactPersonFirstName}
                        /> <br/>
                        <TextField
                            label = "Contact person - surname"
                            id = "partnerContactPersonSurname"
                            required = {true}
                            type = "text"
                            onChange = {handleChangeContactPersonSurname}
                        /> <br/>
                        <TextField
                            label = "Contact person - email"
                            id = "partnerContactPersonEmail"
                            required = {true}
                            type = "text"
                            onChange = {handleChangeContactPersonEmail}
                        /> <br/>
                        <TextField
                            label = "Location"
                            id = "partnerLocation"
                            required = {false}
                            type = "text"
                            onChange = {handleChangeLocation}
                        /> <br/>
                        <Button
                            id = "submittBtn"
                            type = "submit"
                        >
                            Submit
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Page>
    );
}

