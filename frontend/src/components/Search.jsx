import React, { useState } from "react";
import axios from "axios"; // Make sure to install axios
import NavBar from "./NavBar"; // Reuse NavBar
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import MovieDetail from "./MovieDetail"; // For showing detailed movie info on click

const Search = () => {
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: "d5fc11bdf6dca0c5aa7d636b1b03a2ad",
            query,
            language: "en",
          },
        }
      );
      console.log(response);
      setResults(response.data.results); // Set the search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); // Set the movie for detail view
  };

  return (
    <div className="bg-black text-white">
      <NavBar />
      <SearchForm onSearch={handleSearch} />
      {selectedMovie ? (
        <MovieDetail
          movieData={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      ) : (
        <ResultList results={results} onMovieClick={handleMovieClick} />
      )}
    </div>
  );
};

export default Search;
