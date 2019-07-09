// Service imports
import HttpService from './HttpService';

export default class ItemService {
    constructor() { }

    static getAllItems() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/items`, (data) => {
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

    static addItem(item) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/item`, item, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }
}