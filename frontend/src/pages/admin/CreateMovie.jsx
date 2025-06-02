import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchGenresQuery } from "../../app/api/genre";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../app/api/movies";

const CreateMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie }] =
    useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageError },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      setMovieData((prevData) => ({
        ...prevData,
        genre: value,
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image: ", uploadImageError);
          toast.error("Failed to upload image");
          return;
        }

        await createMovie({
          ...movieData,
          image: uploadedImagePath,
        });

        navigate("/admin/movies-list");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          ratings: 0,
          image: null,
          genre: "",
        });

        toast.success("Movie Added To Database");
      }
    } catch (error) {
      console.error("Failed to create movie: ", error);
      toast.error(
        `Failed to create movie: ${error?.message || "Unknown error occurred"}`
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-xl">
      <p className="text-green-200 text-2xl mb-4">Create Movie</p>

      <form className="space-y-4">
        <div>
          <label htmlFor="movieName" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="movieName"
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="w-full max-w-xs border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="movieYear" className="block text-sm font-medium">
            Year
          </label>
          <input
            id="movieYear"
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="w-full max-w-xs border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="movieDetail" className="block text-sm font-medium">
            Detail
          </label>
          <textarea
            id="movieDetail"
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="w-full max-w-xs border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="movieCast" className="block text-sm font-medium">
            Cast (comma-separated)
          </label>
          <input
            id="movieCast"
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="w-full max-w-xs border px-3 py-2 rounded"
          />
        </div>

        {/* Genre + Buttons Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex-1">
            <label htmlFor="movieGenre" className="block text-sm font-medium">
              Genre
            </label>
            <select
              id="movieGenre"
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="w-full max-w-xs border px-3 py-2 rounded"
            >
              {isLoadingGenres ? (
                <option>Loading genres...</option>
              ) : (
                genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Buttons aligned to right of Genre in desktop, below in mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="border border-gray-400 px-4 py-2 rounded cursor-pointer text-sm">
              {!selectedImage ? "Upload Image" : "Change Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={handleCreateMovie}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 cursor-pointer"
              disabled={isCreatingMovie || isUploadingImage}
            >
              {isCreatingMovie || isUploadingImage
                ? "Creating..."
                : "Create Movie"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMovie;
