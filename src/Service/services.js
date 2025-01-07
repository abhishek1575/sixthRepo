import axios from "axios";

const API_URL = "http://localhost:8083";

export const fetchData = async () => {
  const response = await axios.get(`${API_URL}/items`);
  return response.data;
};

export const updateItem = async (updatedData) => {
  const token = sessionStorage.getItem("token"); // Retrieve token from session storage
  const response = await axios.put(`${API_URL}/item/edit`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`, // Add Bearer token to the headers
    },
  });
  return response.data;
};

export const deleteItem = async (id) => {
  const token = sessionStorage.getItem("token"); // Retrieve token from session storage
  const response = await axios.delete(`${API_URL}/item/delete`, {
    headers: {
      Authorization: `Bearer ${token}`, // Add Bearer token to the headers
    },
    params: {
      ID: id,
    },
  });
  return response.data;
};

export const requestItem = async (updatedData) => {
  const token = sessionStorage.getItem("token"); // Retrieve token from session storage
  const response = await axios.post(`${API_URL}/item/request`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`, // Add Bearer token to the headers
    },
  });
  return response.data;
};
