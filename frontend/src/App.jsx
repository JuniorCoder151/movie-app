import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import MovieList from "./components/MovieList";
import Banner from "./components/Banner";
import MovieDetail from "./components/MovieDetail";
import requests from "./components/requests";
import Search from "./components/Search";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null); // Store selected movie
  const [activeCategory, setActiveCategory] = useState(null); // Store active category
  const movieDetailRef = useRef(null); // Reference for the MovieDetail component

  // Handle movie selection/deselection
  const handleMovieClick = (movie, category) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null); // Deselect movie
      setActiveCategory(null); // Reset active category
    } else {
      setSelectedMovie(movie); // Select movie
      setActiveCategory(category); // Set active category
    }
  };

  // Scroll to MovieDetail when selected
  useEffect(() => {
    if (selectedMovie && movieDetailRef.current) {
      movieDetailRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedMovie]);

  return (
    <Router>
      <NavBar /> {/* Navigation bar at the top */}
      <Routes>
        {/* Main route rendering movie lists and banner */}
        <Route
          path="/"
          element={
            <div>
              <Banner /> {/* Banner component displaying top movie */}
              <div className="bg-black">
                {/* Loop through different movie categories */}
                {[
                  {
                    title: "Original",
                    fetchUrl: requests.fetchNetflixOriginals,
                    isLargeRow: true,
                    // Netflix Originals have poster images
                  },
                  { title: "Xu hướng", fetchUrl: requests.fetchTrending },
                  { title: "Xếp hạng cao", fetchUrl: requests.fetchTopRated },
                  { title: "Hành động", fetchUrl: requests.fetchActionMovies },
                  { title: "Hài", fetchUrl: requests.fetchComedyMovies },
                  { title: "Kinh dị", fetchUrl: requests.fetchHorrorMovies },
                  { title: "Lãng mạn", fetchUrl: requests.fetchRomanceMovies },
                  { title: "Tài liệu", fetchUrl: requests.fetchDocumentaries },
                ].map(({ title, fetchUrl, isLargeRow }) => (
                  <div key={title}>
                    <MovieList
                      title={title} // Category name
                      fetchUrl={fetchUrl} // Fetch URL for movies
                      isLargeRow={isLargeRow} // Determines the size of the movie images
                      onMovieClick={(movie) => handleMovieClick(movie, title)} // Handle movie click
                    />
                    {/* Show movie detail if a movie is selected */}
                    {selectedMovie && activeCategory === title && (
                      <div ref={movieDetailRef}>
                        {/* Reference the MovieDetail here */}
                        <MovieDetail
                          movieData={selectedMovie} // Movie detail data
                          onClose={() => {
                            setSelectedMovie(null); // Close movie details
                            setActiveCategory(null); // Reset active category
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          }
        />

        {/* Route for search page */}
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
