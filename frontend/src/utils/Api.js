class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            // headers: this._headers
        })
        .then(this._getResponseData)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            // headers: this._headers
        })
        .then(this._getResponseData)
    }

    editProfile(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
        .then(this._getResponseData)
    }

    editAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink.avatar
            })
        })
        .then(this._getResponseData)
    }

    postCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
        .then(this._getResponseData)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            // headers: this._headers,
        })
        .then(this._getResponseData)
    }

    changeLikeCardStatus(id, setLike) {
        if(setLike) {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                credentials: 'include',
                headers: this._headers,
            })
            .then(this._getResponseData);
        } else {
            return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                credentials: 'include',
                headers: this._headers,
            })
            .then(this._getResponseData);
        }
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const api = new Api({
    baseUrl: 'http://api.mesto.by.vlad.nomoredomains.xyz',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;