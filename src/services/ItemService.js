// Service imports
import HttpService from './HttpService';

export default class ItemService {
    constructor() { }

    static getAllItems() {
        console.log('called items service')
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/items`, (data) => {
                console.log('data' + data);
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static getItem(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/item/${id}`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }
}