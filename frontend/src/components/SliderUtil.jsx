import Slider from "react-slick";
import MovieCard from "../pages/movies/MovieCard";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderUtil = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (!data || data.length === 0) return null;
  if (data.length === 1) {
    return (
      <div className="flex justify-center">
        <MovieCard movie={data[0]} />
      </div>
    );
  }

  return (
    <div className="relative px-4">
      <Slider {...settings}>
        {data?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

SliderUtil.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SliderUtil;
