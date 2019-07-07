// Service imports
import HttpService from './HttpService';

export default class CategoryService {
    constructor() { }

    static categoriesURI() { return `${HttpService.baseURI()}/categories`; }

    static getCategories() {
        return new Promise((resolve, reject) => {
            HttpService.get(this.categoriesURI(), (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }
}