import React from "react";

function Banner() {
  return (
    <div
      className="h-[40vh] md:h-[80vh] bg-cover bg-center flex items-end"
      style={{
        // ✅ Set background image for the banner
        backgroundImage: `url(https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/10/avengers-doomsday-filming-start.jpg)`,
      }}
    >
      {/* ✅ Movie Title Overlay */}
      <div className="text-white w-full text-center bg-green-900/50 p-1.5 text-2xl">
        Avengers Movie
      </div>
    </div>
  );
}

export default Banner;
