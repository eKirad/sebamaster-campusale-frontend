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

    static addCategory(category) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HttpService.baseURI()}/categories`, category, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }

    static deleteCategory(categoryId) {
        return new Promise((resolve, reject) => {
            HttpService.delete(`${HttpService.baseURI()}/categories/${categoryId}`, (data) => {
                resolve(data);
            }, (textStatus) => {
                reject(textStatus);
            })
        });
    }
}