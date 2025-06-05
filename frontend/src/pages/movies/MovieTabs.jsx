import { Link } from "react-router";
import PropTypes from 'prop-types';

const MovieTabs = ({
  loadingMovieReview,
  userInfo,
  submitHandler,
  comment,
  setComment,
  movie,
}) => {
  return (
    <div>
      <section className="mb-10">
        {userInfo ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label
                htmlFor="comment"
                className="block text-xl mb-2 text-white"
              >
                Write Your Review
              </label>

              <textarea
                id="comment"
                rows="4"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="p-3 border border-gray-600 rounded-lg w-full max-w-2xl text-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 transition-colors text-white py-2 px-6 rounded-lg"
              disabled={loadingMovieReview}
            >
              {loadingMovieReview ? "Submitting..." : "Submit"}
            </button>
          </form>
        ) : (
          <p className="text-white">
            Please{" "}
            <Link to="/login" className="underline text-teal-400">
              Sign In
            </Link>{" "}
            to write a review
          </p>
        )}
      </section>

      <section className="mt-10">
        {movie?.reviews.length === 0 ? (
          <p className="text-white">No Reviews</p>
        ) : (
          <div className="space-y-6">
            {movie?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-5 rounded-lg w-full max-w-2xl shadow-md"
              >
                <div className="flex justify-between items-center">
                  <strong className="text-[#B0B0B0]">{review.name}</strong>
                  <p className="text-sm text-gray-500">
                    {review.createdAt?.substring(0, 10)}
                  </p>
                </div>

                <p className="mt-4 text-white">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

MovieTabs.propTypes = {
  loadingMovieReview: PropTypes.bool.isRequired,
  userInfo: PropTypes.object,
  submitHandler: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  setComment: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default MovieTabs;