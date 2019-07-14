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
            HttpService.get(`${HttpService.baseURI()}/items/${id}`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static getPartnerItems() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/partner-items`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static setItemDiscount(discountId, itemId) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${HttpService.baseURI()}/items`, {
                discountId,
                itemId
            }, (data) => {
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