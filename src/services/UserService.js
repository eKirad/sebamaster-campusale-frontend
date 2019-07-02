// React imports
import React from 'react';

// Service imports
import HttpService from './HttpService';

export default class UserService {
    constructor() { }

    static getCurrentUser() {
        const token = window.localStorage['jtwToken'];
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
            username: JSON.parse(window.atob(base64)).username
        }

        // console.log(`the return obj is`);
        // console.log(returnObj);
        return returnObj;
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

    static register(username, password) {
        console.log('inside UserService register')
        console.log(username);
        console.log(password);
        const myObj = {
            username: username,
            password: password
        }
        
        console.log('inside UserService.register()')
        console.log(myObj);

        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/signup`, {
                username,
                password
            }, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    // ?
    static isAutehnticated() {
        return window.localStorage['jtwToken'] ? true : false;
    }
}