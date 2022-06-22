import React from "react";

const SlideshowButtons = ({ nextSlide, previousSlide }) => {
  return (
    <div>
      <button className="prev" onClick={() => previousSlide()}>
        &#10094;
      </button>
      <button className="next" onClick={() => nextSlide()}>
        &#10095;
      </button>
    </div>
  );
};

export default SlideshowButtons;
