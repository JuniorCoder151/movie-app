import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const fetchMovies = async (endpoint) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

export default instance;
