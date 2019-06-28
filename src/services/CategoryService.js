// Service imports
import HttpService from './HttpService';

export class CategoryService {
    constructor() { }

    static categoriesURI() { return `${HttpService.baseURI()}/categories`; }

    static getCategories() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.categoriesURI(), (data) => {
                console.log('From CategoryService' + data)
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }
}