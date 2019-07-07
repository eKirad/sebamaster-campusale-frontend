// Service imports
import HttpService from './HttpService';

export default class PartnerService {
    constructor() { }

    static getAllPartners() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/partners`, (data) => {
                console.log(`PARTNER SERVICE`);
                console.log(`${data}`)
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }
}