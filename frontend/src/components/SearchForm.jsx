import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import MovieDetail from "./MovieDetail";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState(""); // Keep as genre ID
  const [genres, setGenres] = useState([]);
  const [mediaType, setMediaType] = useState("all");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Added for pagination
  const movieDetailRef = useRef(null);

  // Fetch genres from backend
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/movies/genres",
          {
            headers: {
              authorization: "8qlOkxz4wq",
            },
          }
        );
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchResults(1); // Fetch the first page of results
  };

  const fetchResults = async (page) => {
    if (query.trim()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/movies/search",
          {
            search: query,
            genre,
            mediaType,
            language,
            year,
          },
          {
            headers: {
              authorization: "8qlOkxz4wq",
            },
            params: { page }, // Include the page number in the query params
          }
        );

        // Filter out movies with no poster or title/name
        const filteredResults = response.data.results.filter((movie) => {
          const hasPoster = movie.poster_path;
          const hasTitle = movie.title || movie.name;
          const matchesGenre = genre
            ? movie.genre_ids?.includes(parseInt(genre)) // Check if genre matches any in genre_ids
            : true;

          return hasPoster && hasTitle && matchesGenre;
        });

        setResults(filteredResults);
        setTotalPages(response.data.total_pages); // Set total pages from response
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setQuery("");
    setGenre("");
    setMediaType("all");
    setLanguage("");
    setYear("");
    setResults([]);
    setSelectedMovie(null);
    setCurrentPage(1); // Reset page on reset
  };

  const handleMovieClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchResults(page); // Fetch results for the selected page
  };

  useEffect(() => {
    if (selectedMovie && movieDetailRef.current) {
      movieDetailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedMovie]);

  return (
    <div className="bg-black min-h-screen text-white relative">
      <NavBar />

      <div className="flex justify-center items-center h-auto pt-10">
        <form
          onSubmit={handleFormSubmit}
          className="bg-white rounded-md w-full sm:w-2/3 lg:w-1/2 shadow-md p-6"
        >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={handleInputChange}
              className="p-3 w-full bg-white text-black border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <select
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              className="p-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <select
              onChange={(e) => setMediaType(e.target.value)}
              value={mediaType}
              className="p-2 border border-gray-300 rounded-md text-black"
            >
              <option value="all">All Types</option>
              <option value="movie">Movie</option>
              <option value="tv">TV Show</option>
              <option value="person">Person</option>
            </select>

            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              className="p-2 border border-gray-300 rounded-md text-black"
            >
              <option value="">Any Language</option>
              <option value="en">English</option>
              <option value="ja">Japanese</option>
              <option value="ko">Korean</option>
            </select>

            <input
              type="text"
              placeholder="Year (e.g. 2020)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-2 border border-gray-300 rounded-md text-black"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-white text-gray-600 hover:bg-gray-700 transition font-semibold"
            >
              RESET
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-400 text-white hover:bg-teal-600 transition"
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="text-center text-white mt-20">Loading...</div>
      )}

      {results.length > 0 && (
        <h3 className="text-2xl font-bold ml-8 mt-10">Search Result</h3>
      )}

      {selectedMovie && (
        <div ref={movieDetailRef}>
          <MovieDetail movieData={selectedMovie} />
        </div>
      )}

      <div className="mt-6 px-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
        {results.length > 0
          ? results.map((movie) => (
              <div
                key={movie.id}
                className="group cursor-pointer"
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="rounded-md w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))
          : !loading && (
              <p className="text-center text-white col-span-full">
                Please enter a movie name to search. e.g. "Spider-man"
              </p>
            )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-blue-400 text-white rounded-md disabled:bg-gray-500"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-blue-400 text-white rounded-md disabled:bg-gray-500"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
