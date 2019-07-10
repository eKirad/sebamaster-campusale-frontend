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



export const UserProfile = ({ user }) => {
    const [updatedUser, setUpdatedUser] = useState({ ...user });

    const [ emailTextFieldData, setEmailTextFieldData ] = useState({
        name: user.email,
        isDisabled: true
    });

    const [ passwordTextFieldData, setPasswordTextFieldData ] = useState({
        name: user.password,
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
    
    const [ birthDateTextFieldData, setBirthdateTextFieldData ] = useState({
        name: user.birthdate,
        isDisabled: true
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


    const handleChangeEmail = (e) => {
        setUpdatedUser({
            ...updatedUser,
            email: e.target.value
        });
    }

    const handleChangeBirthdate = (e) => {
        console.log(e.target.value);
    }



    const handleEditProfile = () => {
        setEmailTextFieldData({...emailTextFieldData,
            isDisabled: false
        });

        setPasswordTextFieldData({...passwordTextFieldData,
            isDisabled: false
        });

        setBirthdateTextFieldData({...birthDateTextFieldData,
            isDisabled: false
        });

        setSelectGenderData({...selectGenderData,
            isDisabled: false
        });

        setSelectLocationData({...selectLocationData,
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
                        value = {user.username}
                        disabled = {true}
                        // onChange = { this.handleChangeUsername }
                        // error = "Username is a required field"
                        /> <br/>
                    <TextField 
                        label = "Email"
                        id = "emailField"
                        type = "text"
                        value = {emailTextFieldData.name}
                        disabled = {emailTextFieldData.isDisabled}
                        onChange = {handleChangeEmail}
                        // error = "Username is a required field"
                    /> <br/>
                    <TextField 
                        label = "Password"
                        id = "passwordField"
                        type = "password"
                        required = {true}
                        value = {passwordTextFieldData.name}
                        disabled = {passwordTextFieldData.isDisabled}
                        // onChange = { this.handleChangePassword }
                        // error = "Password is a required field"
                    /> <br/> 
                    <TextField 
                        label = "Birthdate"
                        id = "birthdateField"
                        type = "date"
                        value = {user.password}
                        disabled = {birthDateTextFieldData.isDisabled}
                        onChange = {handleChangeBirthdate}
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
                    <Button onClick = {handleEditProfile}>
                        Edit profile
                    </Button>
                    <Button>
                        Save
                    </Button>
                </CardContent>
            </Card>
        </Page>
    );
}

