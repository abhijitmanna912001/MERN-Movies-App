import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../app/api/movies";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        All Movies ({movies?.length || 0})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies?.map((movie) => (
          <div
            key={movie._id}
            className="bg-white shadow-md rounded overflow-hidden flex flex-col"
          >
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg text-gray-700 font-semibold mb-2">
                {movie.name}
              </h2>
              <p className="text-sm text-black flex-1">{movie.detail}</p>

              <Link
                to={`/admin/movies/update/${movie._id}`}
                className="mt-4 inline-block bg-teal-500 hover:bg-teal-600 text-white text-center px-4 py-2 rounded"
              >
                Update Movie
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMoviesList;
