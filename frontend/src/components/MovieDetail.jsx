import React, { useEffect, useState } from "react";
import YouTubeComponent from "./YouTube";
import axios from "axios";

const MovieDetail = ({ movieData }) => {
  const [trailerKey, setTrailerKey] = useState(null); // Store the trailer key for YouTube

  useEffect(() => {
    if (!movieData) return; // If no movie data, don't fetch trailer

    const fetchTrailer = async () => {
      try {
        // Replace this URL with the backend API
        const response = await axios.post(
          "http://localhost:5000/api/movies/video",
          {
            film_id: movieData.id, // Send the film_id from movieData to the backend
            authorization: "8qlOkxz4wq",
          }
        );
        if (response.status == 400) {
          console.log("No trailer found for this movie"); // Log if no trailer found
          setTrailerKey(null); // Reset trailer key if not found
          return;
        }
        if (response.status == 404) {
          console.log("No video found"); // Log if no trailer found
          setTrailerKey(null); // Reset trailer key if not found
          return;
        }
        const trailerData = response.data; // The backend should return the trailer info
        // Check if the trailer key exists and set it
        if (trailerData && trailerData.key) {
          setTrailerKey(trailerData.key);
        } else {
          setTrailerKey(null); // If no trailer found, reset the key
        }
      } catch (error) {
        console.error("Error fetching trailer:", error.response.data.message);
        setTrailerKey(null); // Handle error and reset trailer key
      }
    };

    fetchTrailer(); // Call the function to fetch trailer
  }, [movieData]); // Re-fetch trailer when movieData changes

  if (!movieData) return null; // Return null if no movie data is passed

  const releaseDate = new Date(movieData.release_date); // Convert release date string to Date object
  const formattedDate = releaseDate.toLocaleDateString("en-US"); // Format the release date

  return (
    <div className="bg-black text-white p-4">
      <div className="mt-4 grid lg:grid-cols-2 gap-4">
        {/* Left Column: Movie Information  */}
        <div>
          <h2 className="text-3xl font-bold">
            {movieData.name || movieData.title}{" "}
            {/* Display movie name or title */}
          </h2>
          <div className="w-full h-[1px] bg-white my-4" />
          <p className="mt-2 font-bold">
            <strong className="font-bold">Release Date:</strong> {formattedDate}{" "}
            {/* Show formatted release date */}
          </p>
          <p className="mt-2 font-bold">
            <strong className="font-bold">Vote: </strong>
            {movieData.vote_average} / 10 {/* Display movie's rating */}
          </p>
          <p className="mt-2">{movieData.overview}</p>{" "}
          {/* Display movie overview */}
        </div>
        {/* Right Column: Movie Trailer */}
        <YouTubeComponent trailerKey={trailerKey} movieData={movieData} />{" "}
        {/* Display the trailer if available */}
      </div>
    </div>
  );
};

export default MovieDetail;
