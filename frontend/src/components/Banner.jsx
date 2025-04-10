import { useEffect, useState } from "react";
import axios from "./api";
import requests from "./requests";
import "../index.css";

const Banner = () => {
  const [movie, setMovie] = useState(null); // Store the selected movie
  const [showFullOverview, setShowFullOverview] = useState(false); // Toggle between showing full overview or shortened

  // Function to get a random movie from a list of movies that have a backdrop and an overview
  const getRandomMovie = (movies) => {
    const validMovies = movies.filter(
      (movie) => movie.backdrop_path && movie.overview
    );
    if (validMovies.length === 0) return null;
    return validMovies[Math.floor(Math.random() * validMovies.length)];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Netflix Originals
        const request = await axios.get(requests.fetchNetflixOriginals, {
          headers: {
            authorization: "8qlOkxz4wq",
          },
        });
        let fetchedMovie = getRandomMovie(request.data.results);

        // If no valid movie from Netflix Originals, fetch trending movies
        if (!fetchedMovie) {
          const trendingRequest = await axios.get(requests.fetchTrending);
          fetchedMovie = getRandomMovie(trendingRequest.data.results);
        }

        // Set the movie to the state
        setMovie(fetchedMovie);
      } catch (error) {
        console.error("Error fetching banner data:", error); // Log any fetch errors
      }
    };

    fetchData(); // Call the function to fetch movie data
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // If no movie data has been loaded yet, show a loading screen
  if (!movie) {
    return (
      <div className="h-[448px] bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative">
      <header
        className="banner relative text-white object-cover pt-20"
        style={{
          backgroundSize: "cover", // Ensure background image covers the header
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`, // Dynamically set the banner image
          backgroundPosition: "center center", // Center the image in the banner
        }}
      >
        <div className="fix px-5 pt-20 pb-32 sm:px-10">
          <h1 className="text-4xl font-bold">{movie.title || movie.name}</h1>
          <div className="mt-12">
            {/* Play button */}
            <button className="bg-gray-700 text-white px-4 py-2 mr-2 font-semibold rounded">
              Play
            </button>
            {/* Add to My List button */}
            <button className="bg-gray-700 text-white px-4 py-2 font-semibold rounded">
              My List
            </button>
          </div>
          <div className="mt-3 max-w-md bg-black bg-opacity-40 p-5">
            {/* Movie overview container */}
            <div
              className={`relative overflow-hidden transition-[max-height] duration-1000 ease-in-out ${
                showFullOverview ? "max-h-[500px]" : "max-h-[100px]"
              }`}
            >
              <p>{movie.overview}</p>
            </div>
            {/* Button to toggle between showing full or shortened overview */}
            <button
              onClick={() => setShowFullOverview(!showFullOverview)} // Toggle state
              className="text-white hover:text-blue-300 mt-2 font-bold size-14 w-max transition-colors duration-1000"
            >
              {showFullOverview ? "Show Less" : "Show More"}{" "}
              {/* Button text changes based on state */}
            </button>
          </div>
        </div>
        {/* Gradient fade effect at the bottom of the banner */}
        <div className="banner-fadeBottom absolute bottom-0 h-20 w-full bg-gradient-to-t from-black to-transparent"></div>
      </header>
    </div>
  );
};

export default Banner;
