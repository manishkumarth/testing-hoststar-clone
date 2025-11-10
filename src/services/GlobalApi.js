
// import axios from 'axios';

// const movieBaseUrl = "https://api.themoviedb.org/3";
// const api_key = ""; // apna actual TMDB API key daalo

// // Trending movies
// const getTrending = axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`);

// // Movies by genre
// const getMovieGenre = (id) => axios.get(`${movieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}`);

// export default {
//   getTrending,
//   getMovieGenre
// };


import axios from "axios";

const api_key = "4c83cb358e54788482e08895d60ca55b";
const baseUrl = "https://api.themoviedb.org/3";

const getTrending = () => axios.get(`${baseUrl}/trending/all/day?api_key=${api_key}`);
const getMovieGenre = (id) => axios.get(`${baseUrl}/discover/movie?api_key=${api_key}&with_genres=${id}`);
const getMovieTrailer = (id) => axios.get(`${baseUrl}/movie/${id}/videos?api_key=${api_key}`);

export default {
  getTrending,
  getMovieGenre,
  getMovieTrailer,
};



