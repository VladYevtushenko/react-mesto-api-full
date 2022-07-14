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

export function register(password, email) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ password, email }),
        "credentials": "include"
    })
    .then(res => getResponseData(res))
}

export function authorize(password, email) {
    return fetch (`${baseUrl}/signin`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ password, email }),
        "credentials": "include"
    })
    .then(res => getResponseData(res));
}

export function getContent(token) {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        // headers: {
        //     "Content-Type": "application/json",
        //     "Authorization" : `Bearer ${token}`,
        // },
        "credentials": "include"
    })
    .then(res => getResponseData(res))
}