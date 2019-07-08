export default class HttpService {
    constructor() { }

    static baseURI() { return `http://localhost:3000/api/v1`; };
    
    static get(uri, onSuccess, onError) {
        console.log(`INSIDE the get method of HttpService!!!!!!---`);
        const token = window.localStorage['jwtToken'];
        console.log(token)
        const header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        fetch(uri, {
            method: 'GET',
            headers: header
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
        const token2 = window.localStorage.jwtToken;
        
        console.log(data)
        console.log(`Token inside the HttpsService's psot() method`);
        console.log(window.localStorage['jwtToken'])
        console.log(token);
        console.log(token2);
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        header.append('Content-type', 'application/json');
        // console.log(header.content-type);

        fetch(uri, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        })
        .then((res) => {
            console.log(`HERE!!!!!!`)
            console.log(res.status)
            if (this.checkIfAuthorized(res) === false) {
                // The user is unauthorized
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
                    console.log(`YES`);
                    console.log(`${res.token}`);
                    window.localStorage['jwtToken'] = res.token;
                    console.log(window.localStorage['jwtToken']);
                }
                onSuccess(res);
            }
        })
        .catch((e) => {
            onError(e.message);
        });
    }

    static checkIfAuthorized(res) {
        return res.status === 401 ? false : true;
    }
}