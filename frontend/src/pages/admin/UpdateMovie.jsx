import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteMovieMutation,
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
} from "../../app/api/movies";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageError },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageError);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      });

      navigate("/movies");
    } catch (error) {
      console.error("Failed to update movie:", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie deleted successfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form className="w-full max-w-4xl px-4">
        <p className="text-green-200 text-2xl mb-6">Update Movie</p>

        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="border px-3 py-2 w-full max-w-md rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Year:</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="border px-3 py-2 w-full max-w-md rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Detail:</label>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="border px-3 py-2 w-full max-w-md rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Cast (comma-separated):</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="border px-3 py-2 w-full max-w-md rounded"
          />
        </div>

        {/* Image upload + buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-4">
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1">Image</label>
            <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-sm text-black px-3 py-2 rounded w-max">
              {selectedImage ? "Change Image" : "Update Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {selectedImage && (
              <span className="text-xs mt-1 text-gray-500">
                Selected: {selectedImage.name}
              </span>
            )}
          </div>

          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={handleUpdateMovie}
              className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer"
              disabled={isUpdatingMovie || isUploadingImage}
            >
              {isUpdatingMovie || isUploadingImage
                ? "Updating..."
                : "Update Movie"}
            </button>

            <button
              type="button"
              onClick={handleDeleteMovie}
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              disabled={isUpdatingMovie || isUploadingImage}
            >
              {isUpdatingMovie || isUploadingImage
                ? "Deleting..."
                : "Delete Movie"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
