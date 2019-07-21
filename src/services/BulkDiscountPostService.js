// Service imports
import HttpService from './HttpService';

export default class BulkDiscountPostService {
    constructor() { }

    static getPosts() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HttpService.baseURI()}/posts/get`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static addPost(discountId) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/posts/add`, {discount:discountId}, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static joinPost(postId) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${HttpService.baseURI()}/posts/join`, {id:postId},(data) => {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    static leavePost(postId) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${HttpService.baseURI()}/posts/leave`, {id:postId}, (data) => {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

}