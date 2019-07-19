// Service imports
import HttpService from './HttpService';

export default class PartnerService {
    constructor() { }

    static getAllPartners(userRole) {
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

    static createPartner(name, isApproved, contactPersonFirstName, contactPersonSurname,
        contactPersonEmail, location) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/partners`, {
                name,
                isApproved,
                contactPersonFirstName,
                contactPersonSurname,
                contactPersonEmail,
                location
            }, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    // Only approves a specific partner
    static updatePartner(partner) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${HttpService.baseURI()}/partners/${partner._id}`, {
                id: partner._id,
                name: partner.name
            }, (data) => {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }
}