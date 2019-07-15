// Service imports
import HttpService from './HttpService';

export default class WishlistService {
    constructor() {
    }

    static checkIfItemInWishlist(itemId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/wishlist/get?itemId=${itemId}`, (data) => {
               data.length > 0 ? resolve(data) : reject("No item with that id in the wishlist");
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static getWishlistItems() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/wishlist/get`, (data) => {
                let retData = {};
                retData.items = [];
                if (data[0])
                {
                    retData.user = data[0].user;
                }

                for(let i=0;i<data.length;i++){
                    retData.items.push(data[i].item);
                }
                resolve(retData);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static addItemToWishlist(itemId) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/wishlist/add`, {itemId: itemId}, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static deleteItemFromWishlist(itemId) {
        return new Promise((resolve, reject) => {
            HttpService.delete(`${HttpService.baseURI()}/wishlist/delete?itemId=${itemId}`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }
}