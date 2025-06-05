import { useDispatch, useSelector } from "react-redux";
import { useFetchGenresQuery } from "../../app/api/genre";

import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetRandomMoviesQuery,
  useGetTopMoviesQuery,
} from "../../app/api/movies";

import { useEffect } from "react";
import {
  setFilteredMovies,
  setMoviesFilter,
  setMovieYears,
  setUniqueYears,
} from "../../app/features/movies/moviesSlice";

import banner from "../../assets/banner 3.jpg";
import MovieCard from "./MovieCard";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    if (!data) return;

    const movieYears = data.map((movie) => movie.year);
    const uniqueYears = Array.from(new Set(movieYears));

    dispatch(setFilteredMovies(data));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;

      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  return (
    <div className="w-full">
      <section>
        <div
          className="relative h-[50rem] w-full mb-[15rem] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

          <div className="relative z-10 text-center text-white mt-[10rem] px-4">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-4">
              The Movies Hub
            </h1>
            <p className="text-lg sm:text-2xl">
              Cinematic Odyssey: Unveiling the Magic of Movies
            </p>
          </div>
        </div>

        <section className="w-full flex flex-col items-center px-4 -mt-[10rem]">
          <input
            type="text"
            className="w-full max-w-[30rem] h-[4rem] border px-6 outline-none rounded text-white bg-black text-center"
            placeholder="Search Movie"
            value={moviesFilter.searchTerm}
            onChange={handleSearchChange}
          />

          <div className="mt-6 w-full max-w-[40rem] flex flex-wrap justify-center gap-4">
            <select
              className="flex-1 min-w-[10rem] border p-2 rounded text-white bg-teal-500"
              value={moviesFilter.selectedGenre}
              onChange={(e) => handleGenreClick(e.target.value)}
            >
              <option value="">Genres</option>
              {genres?.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select
              className="flex-1 min-w-[10rem] border p-2 rounded text-white bg-teal-500"
              value={moviesFilter.selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value="">Year</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="flex-1 min-w-[10rem] border p-2 rounded text-white bg-teal-500"
              value={moviesFilter.selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="new">New Movies</option>
              <option value="top">Top Movies</option>
              <option value="random">Random Movies</option>
            </select>
          </div>
        </section>
      </section>

      <section className="mt-[10rem] w-full flex justify-center items-center flex-wrap gap-6 px-4">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </section>
    </div>
  );
  
};

export default AllMovies;
