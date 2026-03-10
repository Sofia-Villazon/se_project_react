import { handleServerResponse } from "./constants";
import { getToken } from "./token";

const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return data;
    })
    .then(handleServerResponse);
};

const addItems = ({ name, imageUrl, weather }) => {
  const token = getToken();
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

const deleteItems = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
  });
};

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export {
  getItems,
  addItems,
  deleteItems,
  baseUrl,
  getUserInfo,
  addCardLike,
  removeCardLike,
};
