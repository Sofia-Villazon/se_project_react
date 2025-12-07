import { handleServerResponse } from "./constants";

const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const getItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

const addItems = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
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
    headers,
  }).then(handleServerResponse);
};

export { getItems, addItems, deleteItems };
