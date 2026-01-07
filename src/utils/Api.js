class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, {
      ...options,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // User routes
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
    });
  }

  updateUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  updateUserAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // Card routes
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
    });
  }

  createCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  // Get initial data (user info and cards) using Promise.all()
  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}

export default Api;

