import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites"); //look inside local storage to see if we already have any favorite movies saved

    //store all info in a list which then converts to JSON stirng in local storage coverts from json string back to a real js object and set that as our favorites
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    // whenever our favorite state changes, we convert the array to a JSON string and store it in local storage
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    // add a movie to our list of favorites
    setFavorites((prev) => [...prev, movie]);
    // if (!favorites.includes(movie)) setFavorites([...favorites, movie])
  };

  const removeFromFavorites = (movieId) => {
    // remove a movie from favorites list
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId)); //this generate a new array where the movies that aren't equal to the one we want to remove
  };

  const isFavorite = (movieId) => {
    // check if a movie is already in our favorites list
    return favorites.some((movie) => movie.id === movieId); // this checks if any of the movies in the array match the movieId we're looking for
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}; //provides state to any of the components that are wrapped around or inside of it

// Add PropTypes definition
MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
