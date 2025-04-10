const fs = require("fs");
const path = require("path");

// Define the path to the movieList.json file
const DATA_PATH = path.join(__dirname, "../data/movieList.json");

const Movies = {
  // Function to read and return all movies
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },

  // Function to get trending movies sorted by popularity
  trending: function () {
    const movies = this.all();
    return movies.sort((a, b) => b.popularity - a.popularity);
  },

  // Function to get top-rated movies sorted by rating
  topRated: function () {
    const movies = this.all();
    return movies.sort((a, b) => b.vote_average - a.vote_average);
  },
  // Function to get movies by genre
  discoverByGenre: function (genreId) {
    const movies = this.all();
    return movies.filter((movie) => movie.genre_ids.includes(genreId));
  },
  searchByAdvancedFilter: function ({
    keyword,
    genre,
    mediaType,
    language,
    year,
  }) {
    const movies = this.all();
    const lowerKeyword = keyword.toLowerCase();

    return movies.filter((movie) => {
      const title = (movie.title || movie.name || "").toLowerCase();
      const overview = (movie.overview || "").toLowerCase();

      // Always check keyword (required)
      const matchKeyword =
        title.includes(lowerKeyword) || overview.includes(lowerKeyword);

      // Optional filters
      const matchGenre = genre
        ? movie.genre_ids?.includes(parseInt(genre)) // Check genre_id
        : true;

      const matchMediaType =
        mediaType && mediaType !== "all"
          ? movie.media_type === mediaType // Ensure this comparison is correct
          : true;

      const matchLanguage = language
        ? movie.original_language === language
        : true;

      const matchYear = year
        ? String(movie.release_date || movie.first_air_date).startsWith(year)
        : true;

      return (
        matchKeyword &&
        matchGenre &&
        matchMediaType &&
        matchLanguage &&
        matchYear
      );
    });
  },
};

module.exports = Movies;
