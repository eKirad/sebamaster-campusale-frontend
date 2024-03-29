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


    static post(uri, data, onSuccess, onError) {
        const token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        header.append('Content-type', 'application/json');

        fetch(uri, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (this.checkIfAuthorized(res)) {
                window.location = '/#login';
                return;
            } else {
                return res.json();
            }
        })
        .then((res) => {
            if (res.error) {
                onError(res.error);
            } else {
                if (res.hasOwnProperty('token')) {
                    window.localStorage['jtwToken'] = res.token();
                }

                onSuccess(res);
            }
        })
        .catch((e) => {
            onError(e.message);
        });
    }

    static checkIfAuthorized(res) {
        return res.status === 401 ? true : false;
    }
}