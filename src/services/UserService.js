// React imports
import React from 'react';

// Service imports
import HttpService from './HttpService';

export default class UserService {
    constructor() { }

    static getCurrentUser() {
        const token = window.localStorage['jwtToken'];
        if (!token) {
            return { };
        }

        const base64Url = token
            .split('.')[1];
        const base64 = base64Url
            .replace('-', '+')
            .replace('_', '/');
        
        const returnObj = {
            id : JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username,
            role: JSON.parse(window.atob(base64)).role,
            partnerId: JSON.parse(window.atob(base64)).partnerId,
        }

        return returnObj;
    }

    // Used in the ProfileView to display further user data, such as email. Maybe the getCurrentUser(())
    // is no longer needed, need to check
    static getCurrentUser2() {
        const token = window.localStorage['jwtToken'];
        if (!token) {
            return { };
        }

        const base64Url = token
            .split('.')[1];
        const base64 = base64Url
            .replace('-', '+')
            .replace('_', '/');
        
        const id = JSON.parse(window.atob(base64)).id;
        
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/user/${id}`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static login(username, password) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/login`, {
                username,
                password
            }, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    // Register partner as a user of the platform (after he got approved), so that the partner
    // is able to post all the available items. Done only by admin.
    static registerPartnerAsUser(username, password, email, role, partnerId) {
        const partnerUserObj = {
            username, 
            password, 
            email, 
            role, 
            partnerId
        }
        
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/signup-partner`, partnerUserObj, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }




    static register(username, password, email, role) {
        const userObj = {
            username: username,
            password: password,
            email: email,
            role: role
        }
        
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/signup`, userObj, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static isAutehnticated() {
        return window.localStorage['jwtToken'] ? true : false;
    }

    static logout() {
        window.localStorage.removeItem('jwtToken');
    }

    static getProfile(userId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/profile/${userId}`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }
}