import {
  useGetAllMoviesQuery,
  useGetTopMoviesQuery,
} from "../../../../app/api/movies";
import { useGetUsersQuery } from "../../../../app/api/users";
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);

  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div className="flex-1 min-h-screen bg-[#111] text-white px-4 md:px-6 lg:ml-64">
      {/* Dashboard Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        <SecondaryCard
          pill="Users"
          content={visitors?.length}
          info="10 more than usual"
          gradient="from-teal-500 to-lime-400"
        />
        <SecondaryCard
          pill="Comments"
          content={sumOfCommentsLength}
          info="5 more than usual"
          gradient="from-[#CCC514] to-[#CDCB8E]"
        />
        <SecondaryCard
          pill="Movies"
          content={allMovies?.length}
          info="10+ more than usual"
          gradient="from-green-500 to-lime-400"
        />
      </section>

      {/* Section Title */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-start sm:items-center mt-10 mb-2 px-4">
        <h2 className="text-xl font-bold sm:col-span-2 mb-2 sm:mb-0">
          Top Content
        </h2>
        <p className="text-sm text-gray-400 text-left sm:text-right">
          Comments
        </p>
      </div>

      {/* Top Movies List */}
      <div className="w-full px-4 space-y-2 mt-4">
        {topMovies?.map((movie) => (
          <VideoCard
            key={movie._id}
            image={movie.image}
            title={movie.name}
            date={movie.year}
            comments={movie.numReviews}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
