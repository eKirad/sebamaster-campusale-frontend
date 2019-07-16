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



export const UserProfile = ({props, user, onEditUser}) => {
    const [updatedUser, setUpdatedUser] = useState({ ...user });

    const [emailTextFieldData, setEmailTextFieldData] = useState({
        name: user.email,
        isDisabled: true
    });

    const [passwordTextFieldData, setPasswordTextFieldData] = useState({
        name: user.password,
        isDisabled: true
    });

    const [selectGenderData, setSelectGenderData] = useState({
        isDisabled: true,
        label: `Gender`,
        data: [ 
            { _id: 1, name: `male` },
            { _id: 2, name: `female` },
            { _id: 3, name: `unknown` },
        ]
    });
    
    const [birthDateTextFieldData, setBirthdateTextFieldData] = useState({
        name: user.birthdate,
        isDisabled: true
    });

    const [selectLocationData, setSelectLocationData] = useState({
        isDisabled: true,
        label: `Location`,
        data: [ 
            { _id: 1, name: `Germany` },
            { _id: 2, name: `US` },
            { _id: 3, name: `UK` },
        ]
    });


    const handleChangePassword = (e) => {
        setPasswordTextFieldData({
            ...passwordTextFieldData,
            name: e.target.value
        });
        
        setUpdatedUser({
            ...updatedUser,
            password: e.target.value
        });
    }

    const handleChangeEmail = (e) => {
        setEmailTextFieldData({
            ...emailTextFieldData,
            name: e.target.value
        });

        setUpdatedUser({
            ...updatedUser,
            email: e.target.value
        });
    }

    const handleChageGender = (e) => {
        switch(e.value) {
            case 1: 
                setUpdatedUser({
                    ...updatedUser,
                    gender: `male`
                });
                break;
            case 2: 
            setUpdatedUser({
                 ...updatedUser,
                 gender: `female`
            });
            break;
            case 3: 
            setUpdatedUser({
                ...updatedUser,
                gender: `unknown`
            });
            break;
        } 
    }

    const handleChageLocation = (e) => {
        switch(e.value) {
            case 1: 
                setUpdatedUser({
                    ...updatedUser,
                    location: `Germany`
                });
                break;
            case 2: 
            setUpdatedUser({
                 ...updatedUser,
                 location: `US`
            });
            break;
            case 3: 
            setUpdatedUser({
                ...updatedUser,
                location: `UK`
            });
            break;
        } 
    }

    const handleChangeBirthdate = (e) => {
        setBirthdateTextFieldData({
            ...birthDateTextFieldData,
            name: e.target.value
        });

        setUpdatedUser({
            ...updatedUser,
            birthdate: e.target.value
        });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(updatedUser)
        onEditUser(updatedUser);
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
        <Page
            props={props}
        >
              <form  onSubmit = {handleSubmit}>
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
                        onChange = {handleChangePassword}
                        // error = "Password is a required field"
                    /> <br/> 
                    <TextField 
                        label = "Birthdate"
                        id = "birthdateField"
                        type = "date"
                        disabled = {birthDateTextFieldData.isDisabled}
                        onChange = {handleChangeBirthdate}
                        // error = "Password is a required field"
                    /> <br/> 
                    <SimpleSelect 
                        style = {simpleSelectStyle}
                        data = {selectGenderData}
                        onSelect = {(selectedOption) => handleChageGender(selectedOption)}
                        disabled = {selectGenderData.isDisabled}
                    />
                    <SimpleSelect
                        defaultSelectValue={user.location}
                        value={selectLocationData}
                        style={simpleSelectStyle}
                        data={selectLocationData}
                        onSelect={(selectedOption) => handleChageLocation(selectedOption)}
                        disabled={selectLocationData.isDisabled}
                    />
                    <Button onClick = {handleEditProfile}>
                        Edit profile
                    </Button>
                    <Button
                        id = "saveBtn"
                        type = "submit"
                    >
                        Save
                    </Button>
                </CardContent>
            </Card>
            </form>
        </Page>
    );
}

