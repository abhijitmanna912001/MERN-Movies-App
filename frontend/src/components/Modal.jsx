import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            className="relative bg-yellow-500 text-black rounded-lg z-10 shadow-lg w-xs max-h-[60vh] overflow-y-auto p-4"
          >
            <div className="flex justify-end">
              <button
                className="text-black font-bold text-lg hover:text-gray-700 focus:outline-none"
                onClick={onClose}
              >
                ✕
              </button>
            </div>

            <div className="mt-2">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
