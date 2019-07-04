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
        }

        console.log(JSON.parse(window.atob(base64)))

        // console.log(`the return obj is`);
        // console.log(returnObj);
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
                console.log(`the use inside the UserService`)
                console.log(data)
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static login(username, password) {
        console.log(`entered UserService.js login()`)
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

    static register(username, password, email) {
        console.log('inside UserService register')
        console.log(username);
        console.log(password);
        const myObj = {
            username: username,
            password: password,
            email: email
        }
        
        console.log('inside UserService.register()')
        console.log(myObj);

        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/signup`, {
                username,
                password,
                email
            }, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static isAutehnticated() {
        return window.localStorage['jwtToken'] ? true : false;
    }

    static logout(){
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