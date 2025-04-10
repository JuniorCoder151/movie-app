// const API_KEY = "d5fc11bdf6dca0c5aa7d636b1b03a2ad";

const requests = {
  fetchTrending: "http://localhost:5000/api/movies/trending",
  fetchNetflixOriginals:
    "http://localhost:5000/api/movies/discover?genre=10770",
  fetchTopRated: "http://localhost:5000/api/movies/top-rate",
  fetchActionMovies: "http://localhost:5000/api/movies/discover?genre=28",
  fetchComedyMovies: "http://localhost:5000/api/movies/discover?genre=35",
  fetchHorrorMovies: "http://localhost:5000/api/movies/discover?genre=27",
  fetchRomanceMovies: "http://localhost:5000/api/movies/discover?genre=10749",
  fetchDocumentaries: "http://localhost:5000/api/movies/discover?genre=99",
};

export default requests;
