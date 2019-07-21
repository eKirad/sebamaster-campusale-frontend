// Service imports
import HttpService from './HttpService';

export default class DiscountService {
    constructor() { }

    static getPartnerDiscounts() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/discounts`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static getBulkDiscounts() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/discounts/bulk`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static addDiscount(discount) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/discounts`, discount, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static deleteDiscount(discountId) {
        return new Promise((resolve, reject) => {
            HttpService.delete(`${HttpService.baseURI()}/discounts/${discountId}`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static updateDiscount(discount) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${HttpService.baseURI()}/discounts`, discount, (data) => {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }
}