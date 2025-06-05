import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MovieCard = ({ movie }) => {
  return (
    <div key={movie._id} className="relative group m-[2rem]">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-[10rem] h-auto aspect-[2/3] max-w-[10rem] sm:max-w-[12rem] md:max-w-[14rem] rounded object-cover transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
      </Link>

      <p className="absolute top-[85%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.name}
      </p>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
