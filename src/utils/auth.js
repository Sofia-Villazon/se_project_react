import { baseUrl } from "./api";
import { getToken } from "./token";
import { handleServerResponse } from "./constants";
// The register function accepts the necessary data as arguments,
// and sends a POST request to the given endpoint.
const signup = (name, avatar, email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

// The login function accepts the necessary data as arguments,
// and sends a POST request to the given endpoint.
const signin = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

const updateUserInfo = (name, avatar) => {
  const token = getToken();
  const updatedUserData = { name, avatar };
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedUserData),
  }).then(handleServerResponse);
};

const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export { signup, signin, updateUserInfo, checkToken };
