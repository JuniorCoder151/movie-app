import { useState, useEffect, useRef } from "react";
import axios from "./api";

const baseImgUrl = "https://image.tmdb.org/t/p/original/";

const MovieList = ({ title, fetchUrl, isLargeRow = false, onMovieClick }) => {
  const [movies, setMovies] = useState([]); // State for storing movies

  // Fetch movies when the component mounts or fetchUrl changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const request = await axios.get(fetchUrl, {
          headers: {
            authorization: "8qlOkxz4wq",
          },
        });

        setMovies(request.data.results);
      } catch (error) {
        console.error(`Error fetching ${title} movies:`, error); // Error handling
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  return (
    <div className="movie-list p-5">
      <h2 className="text-white text-xl font-semibold mb-3">{title}</h2>
      <div className="scroll-container flex space-x-3 p-2 overflow-x-scroll bg-black">
        {/* // Map over movies and display each one */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`transition-transform duration-300 ease-in-out transform hover:scale-110 ${
              isLargeRow ? "h-60 w-auto" : "h-36 w-auto"
            } rounded-md cursor-pointer`}
            src={`${baseImgUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title || movie.name}
            onClick={() => onMovieClick(movie)} // Pass movie to the click handler
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
