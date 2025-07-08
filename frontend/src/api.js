import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080', // Change this to your backend URL
});

export const fetchMovies = (params) => API.get('/movies', { params });