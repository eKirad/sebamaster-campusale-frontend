// Service imports
import HttpService from './HttpService';

export default class PartnerService {
    constructor() { }

    static getAllPartners(userRole) {
        console.log(`this is the USERROLE`)
        console.log(userRole)
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/partners`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static getApprovedPartners() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/approved-partners`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }
}