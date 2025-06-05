import { toast } from "react-toastify";
import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../app/api/movies";

const AllComments = () => {
  const { data: movie, refetch } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="w-full px-4 py-8 flex flex-col items-center">
      {movie?.map((m) =>
        m?.reviews.map((review) => (
          <div
            key={review._id}
            className="bg-[#1A1A1A] w-full max-w-2xl p-5 rounded-lg shadow-md mt-6"
          >
            <div className="flex justify-between items-center">
              <strong className="text-[#B0B0B0]">{review.name}</strong>
              <p className="text-sm text-gray-500">
                {review.createdAt.substring(0, 10)}
              </p>
            </div>

            <p className="my-4 text-white">{review.comment}</p>

            <div className="text-right">
              <button
                className="text-red-500 hover:text-red-700 font-semibold text-sm"
                onClick={() => handleDeleteComment(m._id, review._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllComments;
