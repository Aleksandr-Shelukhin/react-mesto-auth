class Api {
  constructor({ dataBaseLink, headers }) {
    this._dataBaseLink = dataBaseLink;
    this._headers = headers;
  }

  _getServerResponse(res) { // проверка состояние сервера
    if(res.ok) {
      return Promise.resolve(res.json()); //если ответ ОК - получаем данные
    }
    return Promise.reject(`Ошибка: ${res.status}`); //если ответ не ОК - выводим код ошибки
  }

  addNewCard(newCardInfo) { // отправляем новую карточку на сервер
    return fetch(`${this._dataBaseLink}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCardInfo.name,
        link: newCardInfo.link,
      }),
    }).then((res) => {
      return this._getServerResponse(res);
    });
  }

  deleteCard(card) { // удаляем карточку с сервера
    return fetch(`${this._dataBaseLink}/cards/${card._id}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then((res) => {
      return this._getServerResponse(res);
    });
  }

  getUserInfo() {  // получаем данные пользователя с сервера
    return fetch(`${this._dataBaseLink}/users/me`, {
      headers: this._headers,
    })
    .then((res) => {
      return this._getServerResponse(res);
    });
  }

  renderCards() { // получаем карточки с сервера
    return fetch(`${this._dataBaseLink}/cards`, {
      headers: this._headers,
    })
    .then((res) => {
      return this._getServerResponse(res);
    });
  }

  getNeededData() {
    return Promise.all([this.getUserInfo(), this.renderCards()]);
  }

  addUserInfo(newInfo) { // меняем имя пользователя на сервере
    return fetch(`${this._dataBaseLink}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newInfo.name,
        about: newInfo.about
      }),
    }).then((res) => {
      return this._getServerResponse(res);
    });
  }

  addLike(cardId) { // ставим лайк
    return fetch(
      `${this._dataBaseLink}/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      }
    ).then((res) => {
      return this._getServerResponse(res);
    });
  }

  deleteLike(cardId) { // удаляем лайк
    return fetch(
      `${this._dataBaseLink}/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then((res) => {
      return this._getServerResponse(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) { // переключатель лайков
  return fetch(
    `${this._dataBaseLink}/cards/${cardId}/likes`,
    {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this._headers,
    }
  ).then((res) => {
    return this._getServerResponse(res);
  });
}

  replaceAvatar(newAvatar) { // меняем картинку аватара
    return fetch(
      `${this._dataBaseLink}/users/me/avatar`,
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(newAvatar),
      }
    ).then((res) => {
      return this._getServerResponse(res);
    });
  }

}

export const api = new Api({
  dataBaseLink: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '3ca7663a-2cbd-48e6-b1af-d0e72d7c6308',
    'Content-Type': 'application/json'
  }
})


