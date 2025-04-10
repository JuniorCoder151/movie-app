const fs = require("fs");
const path = require("path");

// Define the path to the video data file
const DATA_PATH = path.join(__dirname, "../data/videoList.json");

const Videos = {
  // Read all videos from videoList.json
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },

  // Function to get the trailer for a specific film by its ID
  getTrailerByFilmId: function (filmId) {
    const videos = this.all(); // Get all videos
    const movie = videos.find((v) => v.id === filmId); // Find the movie by its ID

    if (!movie) {
      return null; // If no movie found with the provided filmId, return null
    }

    // Filter videos based on type (Trailer or Teaser), official status, and site (YouTube)
    const validVideos = movie.videos.filter(
      (video) =>
        video.official === true &&
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser")
    );

    if (validVideos.length === 0) {
      return null; // If no valid trailer or teaser is found, return null
    }

    // Sort the valid videos by published_at (most recent first)
    validVideos.sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );

    // Return the most recent valid trailer or teaser
    return validVideos[0];
  },
};

module.exports = Videos;
