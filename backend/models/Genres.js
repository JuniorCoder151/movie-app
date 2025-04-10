const fs = require("fs");
const path = require("path");

// Define the path to the genre data file
const DATA_PATH = path.join(__dirname, "../data/genreList.json");

const Genres = {
  // Read all genres from genreList.json
  all: function () {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  },

  // Function to get a genre name by its ID
  getGenreById: function (id) {
    const genres = this.all(); // Get all genres
    const genre = genres.find((g) => g.id === id); // Find the genre with the specified ID
    return genre ? genre.name : null; // Return the genre name or null if not found
  },
};

module.exports = Genres;
