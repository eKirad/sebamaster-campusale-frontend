export default class HttpService {
    constructor() { }

    static baseURI() { return `http://localhost:3000/api/v1`; };
    
    static get(uri, onSuccess, onError) {
        const token = window.localStorage['jwtToken'];
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
                    window.localStorage['jwtToken'] = res.token;
                }
                onSuccess(res);
            }
        })
        .catch((e) => {
            onError(e.message);
        });
    }

    static postMultipart(uri, data, onSuccess, onError) {
        const token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        var formData = new FormData();

        for ( let key in data ) {
            formData.append(key, data[key]);
        }

        fetch(uri, {
            method: 'POST',
            headers: header,
            body: formData
        })
            .then((res) => {
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
                        window.localStorage['jwtToken'] = res.token;
                    }
                    onSuccess(res);
                }
            })
            .catch((e) => {
                onError(e.message);
            });
    }

    static put(url, data, onSuccess, onError) {
        const token = window.localStorage['jwtToken'];
        let header = new Headers();
        
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }
        
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        }).then((res) => {
            if(this.checkIfAuthorized(res) === false) {
                window.location = "/#login";
                return;
            }
            else {
                return res.json();
            }
        }).then((res) => {
            if(res.error) {
                onError(res.error);
            }
            else {
                if(res.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = res.token;
                }
                onSuccess(res);
            }
        }).catch((e) => {
            onError(e.message);
        });
    }

    static delete(uri, onSuccess, onError) {
        const token = window.localStorage['jwtToken'];
        const header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        fetch(uri, {
            method: 'DELETE',
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

    static checkIfAuthorized(res) {
        return res.status === 401 ? false : true;
    }
}