import axios from "axios";

const API_URL = "/api/v1";

export const getCats = () => axios.get(`${API_URL}/cats`);
export const getCatById = (id) => axios.get(`${API_URL}/cat/${id}`);
export const createCat = (cat) => axios.post(`${API_URL}/cat`, cat);
export const updateCat = (id, cat) => axios.put(`${API_URL}/cat/${id}`, cat);
export const deleteCat = (id) => axios.delete(`${API_URL}/cat/${id}`);
