const API_KEY = "63998fb072eb437ea753a8686fba8787";
const BASE_URL = "https://api.rawg.io/api";

export const fetchGamesByPage = (page) =>
  `${BASE_URL}/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&page=${page}&page_size=20`;

export const fetchGameDetails = (id) =>
  `${BASE_URL}/games/${id}?key=${API_KEY}`;

export const fetchAllGenres = () =>
  `${BASE_URL}/genres?key=${API_KEY}&dates=2024-01-01,2024-12-31&page=1`;

export const fetchGamesByGenre = (genre, page = 1) =>
  `${BASE_URL}/games?key=${API_KEY}&dates=2024-01-01,2024-12-31&genres=${genre}&page=${page}&page_size=20`;

export const fetchSearchGames = (query, page = 1) =>
  `${BASE_URL}/games?key=${API_KEY}&search=${query}&page=${page}&page_size=20`;

