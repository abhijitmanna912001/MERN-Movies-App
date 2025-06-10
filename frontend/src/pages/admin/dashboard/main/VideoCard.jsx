import PropTypes from "prop-types";

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <div className="grid grid-cols-3 items-center bg-[#1A1A1A] rounded-md px-4 py-3 mb-3 w-full">
      {/* Left - Thumbnail */}
      <div className="flex items-center space-x-4 col-span-2">
        <img
          src={image}
          alt="Video thumbnail"
          className="h-[3rem] w-[3rem] object-cover rounded"
        />
        <div>
          <h2 className="text-white text-base font-semibold truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>

      {/* Right - Comment count */}
      <div className="text-right text-white text-base font-semibold">
        {comments}
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
};

export default VideoCard;
