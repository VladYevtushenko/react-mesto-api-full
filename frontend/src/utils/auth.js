export const baseUrl = 'https://api.mesto.by.vlad.nomoredomains.xyz';

function getResponseData(res) {
    if (res.ok) {
        return res.json();
    } else {
        return res.json()
            .then(data => {
                throw new Error(data.error || data.message);
            });
    }
}

export function register(email, password) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email }),
        credentials: 'include'
    })
    .then(res => getResponseData(res))
}

export function authorize(email, password) {
    return fetch (`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password}),
        credentials: 'include'
    })
    .then((data) => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            return data;
        }
    })
    // .then(res => getResponseData(res));
}

export function getContent() {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        // headers: {
        //     "Content-Type": "application/json"
        //     //"Authorization" : `Bearer ${token}`,
        // },
        credentials: 'include'
    })
    .then(res => getResponseData(res))
}