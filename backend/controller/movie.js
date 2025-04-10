const Movies = require("../models/Movies");
const Genres = require("../models/Genres");
const Videos = require("../models/Videos");
const { paginate } = require("../util/paging");

// Controller: Get trending movies with pagination
const getTrendingMovies = (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page query
    const trendingMovies = Movies.trending(); // Get sorted trending movies
    const paginatedMovies = paginate(trendingMovies, page); // Apply pagination

    res.status(200).json(paginatedMovies); // Return the paginated response
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending movies" });
  }
};

// Controller: Get top-rated movies with pagination
const getTopRatedMovies = (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page query
    const topRatedMovies = Movies.topRated(); // Get sorted top-rated movies
    const paginatedMovies = paginate(topRatedMovies, page); // Apply pagination

    res.status(200).json(paginatedMovies); // Return the paginated response
  } catch (error) {
    res.status(500).json({ message: "Error fetching top-rated movies" });
  }
};
const getMoviesByGenre = (req, res, next) => {
  try {
    const { genre, page = 1 } = req.query; // Get genre and page from query parameters

    if (!genre) {
      return res.status(400).json({ message: "Not found genre parameter" }); // Genre is required
    }

    // Parse the genre to an integer
    const genreId = parseInt(genre, 10);

    // Check if the genre ID is valid
    const genreName = Genres.getGenreById(genreId);
    if (!genreName) {
      return res.status(400).json({ message: "Not found that genre id" }); // Invalid genre ID
    }

    // Get movies filtered by the genre ID
    const moviesByGenre = Movies.discoverByGenre(genreId);
    const paginatedMovies = paginate(moviesByGenre, page); // Apply pagination

    // Return the response with the results and genre name
    res.status(200).json({
      results: paginatedMovies.results,
      page: paginatedMovies.page,
      total_pages: paginatedMovies.total_pages,
      genre_name: genreName,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies by genre" });
  }
};

const getAllGenres = (req, res, next) => {
  try {
    const genres = Genres.all(); // Fetch all genres from the Genres model
    res.status(200).json(genres); // Return the genres as JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching genres" });
  }
};
const getTrailerByFilmId = async (req, res, next) => {
  const film_id = req.body.film_id; // Extract film_id from request body

  if (!film_id) {
    return res.status(400).json({ message: "Not found film_id parameter" });
  }

  // Get all videos from the videoList.json file
  const videos = await Videos.getTrailerByFilmId(film_id);

  if (!videos) {
    return res.status(404).json({ message: "Not found video" });
  }

  // If a trailer is found, return the trailer details (key)
  return res.status(200).json({
    key: videos.key, // Return the YouTube video key
  });
};
const getMoviebySearch = (req, res, next) => {
  try {
    const { search, genre, mediaType, language, year } = req.body;
    const page = parseInt(req.query.page) || 1;

    if (!search) {
      return res
        .status(400)
        .json({ message: "Missing required keyword parameter" });
    }

    const matchedMovies = Movies.searchByAdvancedFilter({
      keyword: search,
      genre,
      mediaType,
      language,
      year,
    });

    const paginatedMovies = paginate(matchedMovies, page);

    res.status(200).json(paginatedMovies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching movies", error: error.message });
  }
};

module.exports = {
  getTrendingMovies,
  getTopRatedMovies,
  getMoviesByGenre,
  getAllGenres,
  getTrailerByFilmId,
  getMoviebySearch,
};
