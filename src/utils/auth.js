export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`)
      }
    })
};

export const signin = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        return Promise.reject(`Ошибка: ${response.status}`)}
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }})
}


export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((response => response.json()))
    .then((res) => {
      if (res.data.email){
        return res;
      }
    })
    .catch((err) => console.log(err));
}