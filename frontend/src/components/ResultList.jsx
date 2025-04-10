import React from "react";

const baseImgUrl = "https://image.tmdb.org/t/p/original/"; // Base URL for images from TMDB

const ResultList = ({ results, onMovieClick }) => {
  return (
    <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Iterate over the movie results and display them */}
      {results.map((movie) => (
        <div
          key={movie.id} // Unique key for each movie
          className="cursor-pointer" // Makes the movie image clickable
          onClick={() => onMovieClick(movie)} // Triggers onMovieClick when the image is clicked
        >
          <img
            src={`${baseImgUrl}${movie.poster_path}`} // Set image URL dynamically using the movie's poster path
            alt={movie.title} // Set the alt text to the movie title
            className="w-full h-auto rounded-md" // Style the image to fit within the grid and add rounded corners
          />
          <h3 className="text-white text-sm mt-2">{movie.title}</h3>{" "}
          {/* Display the movie title under the image */}
        </div>
      ))}
    </div>
  );
};

export default ResultList;
