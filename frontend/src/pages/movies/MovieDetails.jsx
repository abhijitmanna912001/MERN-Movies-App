import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";

import {
    useAddMovieReviewMutation,
    useGetSpecificMovieQuery,
} from "../../app/api/movies";

import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

    const submitHandler = async (e) => {
      e.preventDefault();

      try {
        await createReview({
          id: movieId,
          rating,
          comment,
        }).unwrap();

        refetch();

        toast.success("Review created successfully");
      } catch (error) {
        toast.error(error.data || error.message);
      }
    };

  return (
    <div>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-4 lg:ml-20"
        >
          Go Back
        </Link>
      </div>

      <div className="mt-[2rem]">
        <div className="flex justify-center items-center px-4">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-full max-w-[250px] h-auto rounded shadow-lg"
          />
        </div>
        {/* Container One */}
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between gap-10 mt-[3rem]">
          <section>
            <h2 className="text-4xl lg:text-5xl my-4 font-extrabold">
              {movie?.name}
            </h2>
            <p className="my-4 text-[#B0B0B0] max-w-xl">{movie?.detail}</p>
          </section>

          <div>
            <p className="text-2xl font-semibold">
              Releasing Date: {movie?.year}
            </p>
            <div>
              {movie?.cast.map((c) => (
                <ul key={c._id}>
                  <li className="mt-2">{c}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-10">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
