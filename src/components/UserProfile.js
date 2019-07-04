import React, { useState }from 'react';
import TextField from '@material-ui/core/TextField';



import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Page from './Page';
import {SimpleSelect} from './SimpleSelect';

const cardStyle = {
    textAlign: 'center'
}
const simpleSelectStyle = {
    width: '150px'
}



export const UserProfile = ({user}) => {
    console.log(user)
    const [ disabled, setDisabled ] = useState(true);
    const [ usernameTextFieldData, setUsernameTextFieldData ] = useState({
        name: user.username,
        isDisabled: true
    });
    const [ emailTextFieldData, setEmailTextFieldData ] = useState({
        name: user.email,
        isDisabled: true
    });
    const [ selectGenderData, setSelectGenderData ] = useState({
        isDisabled: true,
        label: `Gender`,
        data: [ 
            { _id: 1, name: `male` },
            { _id: 2, name: `female` },
            { _id: 3, name: `unknown` },
        ]
    });
    const [ selectLocationData, setSelectLocationData ] = useState({
        isDisabled: true,
        label: `Location`,
        data: [ 
            { _id: 1, name: `Germany` },
            { _id: 2, name: `US` },
            { _id: 3, name: `UK` },
        ]
    });

    const handleCLick = () => {
        setDisabled(false);
        console.log(`After change = ${name}`)
    }

    const handleEditProfile = () => {
        setSelectGenderData({...selectGenderData,
            isDisabled: false
        });

        setSelectLocationData({...selectLocationData,
            isDisabled: false
        });

        setUsernameTextFieldData({...usernameTextFieldData,
            isDisabled: false
        });

        setEmailTextFieldData({...emailTextFieldData,
            isDisabled: false
        });
    }

    return(
        <Page>
            <Card style = {cardStyle}>
                <CardContent>
                    <TextField 
                        label = "Username"
                        id = "usernameField"
                        type = "text"
                        value = {usernameTextFieldData.name}
                        disabled = {usernameTextFieldData.isDisabled}
                        // onChange = { this.handleChangeUsername }
                        // error = "Username is a required field"
                        /> <br/>
                    <TextField 
                        label = "Email"
                        id = "emailField"
                        type = "text"
                        value = {emailTextFieldData.name}
                        disabled = {emailTextFieldData.isDisabled}
                        // onChange = { this.handleChangeUsername }
                        // error = "Username is a required field"
                    /> <br/>
                    <TextField 
                        label = "Password"
                        id = "passwordField"
                        type = "password"
                        required = {true}
                        value = {user.password}
                        disabled = {true}
                        // onChange = { this.handleChangePassword }
                        // error = "Password is a required field"
                        /> <br/> 
                    <SimpleSelect 
                        style = {simpleSelectStyle}
                        data = {selectGenderData}
                        disabled = {selectGenderData.isDisabled}
                    />
                    <SimpleSelect 
                        style = {simpleSelectStyle}
                        data = {selectLocationData}
                        disabled = {selectLocationData.isDisabled}
                    />
                    <IconButton onClick = {handleEditProfile}>
                        <EditIcon/>
                    </IconButton>
                    <Button>
                        Save
                    </Button>
                </CardContent>
            </Card>
        </Page>
    );
}

