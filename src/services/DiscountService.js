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
}