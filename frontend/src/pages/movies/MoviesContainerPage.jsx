import { useState } from "react";
import { useFetchGenresQuery } from "../../app/api/genre";

import {
  useGetNewMoviesQuery,
  useGetRandomMoviesQuery,
  useGetTopMoviesQuery,
} from "../../app/api/movies";
import SliderUtil from "../../components/SliderUtil";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="w-full max-w-screen mx-auto flex flex-col lg:flex-row gap-4">
      <nav className="w-full lg:w-[14rem] px-4 lg:pl-0 lg:pr-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
        {genres?.map((g) => (
          <button
            key={g._id}
            className={`min-w-max lg:w-full transition duration-300 ease-in-out cursor-pointer hover:bg-teal-500 p-2 rounded text-lg text-left ${
              selectedGenre === g._id ? "bg-teal-500 text-white" : ""
            }`}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      {/* Sliders */}
      <section className="flex flex-col items-center justify-center w-full lg:w-3/4 pr-4">
        {[
          { title: "Choose For You", data: randomMovies },
          { title: "Top Movies", data: topMovies },
          {
            title: "Choose Movie",
            data:
              selectedGenre && filteredMovies?.length === 0
                ? null
                : filteredMovies?.length
                ? filteredMovies
                : data,
          },
        ].map(({ title, data }) => (
          <div
            key={title}
            className="relative w-full md:w-[90%] xl:w-full mb-8"
          >
            <h1 className="mb-5 text-xl font-semibold">{title}</h1>
            {title === "Choose Movie" &&
            selectedGenre &&
            filteredMovies?.length === 0 ? (
              <p className="text-center text-red-500">
                No movies found in this genre.
              </p>
            ) : (
              <SliderUtil data={data} />
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default MoviesContainerPage;
