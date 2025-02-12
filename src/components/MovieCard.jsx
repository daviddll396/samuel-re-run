import { useMovieContext } from "../contexts/MovieContext";
// import PropTypes from "prop-types";
import "../css/Moviecard.css";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
      // alert("Removed from favorites");
    } else {
      addToFavorites(movie);
      // alert("Added to favorites");
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
};

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     poster_path: PropTypes.string.isRequired,
//     release_date: PropTypes.string,
//   }).isRequired,
// };

export default MovieCard;
