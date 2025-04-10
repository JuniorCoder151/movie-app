import React from "react";
import YouTube from "react-youtube";

const YouTubeComponent = ({ trailerKey, movieData }) => {
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="flex justify-center items-center w-full">
      {trailerKey ? (
        <YouTube videoId={trailerKey} opts={opts} className="w-full" />
      ) : (
        // Display trailer
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movieData.backdrop_path || movieData.poster_path
          }`}
          alt={movieData.title || movieData.name}
          className="h-60 w-full object-cover" // Image is responsive with full width and aspect cover
        />
      )}
    </div>
  );
};

export default YouTubeComponent;
