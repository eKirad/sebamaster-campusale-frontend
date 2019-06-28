export default class HttpService {
    constructor() { }

    static baseURI() { return `http://localhost:3000/api/v1`; };
    
    static get(uri, onSuccess, onError) {
        console.log('inside')
        // JWT token .. TODO
        // header .. TODO
        fetch(uri, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.error) {
                onError(res.error);
            } else {
                onSuccess(res);
            }
        })
        .catch((e) => {
            onError(e.message);
        })
    }
}