// React imports
import React from 'react';

// Service imports
import HttpService from './HttpService';

export default class UserService {
    constructor() { }

    static login(username, password) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/login`), {
                username,
                password
            }, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            }
        });
    }

    static register(username, password) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/signup`), {
                username,
                password
            }, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            }
        });
    }
}