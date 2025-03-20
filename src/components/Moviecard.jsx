import React from "react";
import Watchlist from "./Watchlist";

function MovieCard({
  watchList, // ✅ List of movies in the watchlist
  handleRemoveFromWatchList, // ✅ Function to remove movie from watchlist
  handleAddToWatchList, // ✅ Function to add movie to watchlist
  movieObj, // ✅ Current movie object
  poster_path, // ✅ Path for the movie poster image
  name, // ✅ Movie name
}) {
  // ✅ Function to check if the current movie is already in the watchlist
  function isMovieInWatchList(movieObj) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id === movieObj.id) {
        return true; // ✅ Movie is already in the watchlist
      }
    }
    return false; // ❌ Movie is not in the watchlist
  }

  return (
    <div
      className="h-[50vh] w-[170px] rounded-xl bg-cover m-1 flex flex-col justify-between items-end bg-center hover:scale-110 hover:cursor-pointer duration-300"
      style={{
        // ✅ Set the background image using the movie poster path
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})`,
      }}
    >
      {/* ✅ Conditional rendering based on whether the movie is in the watchlist */}
      {isMovieInWatchList(movieObj) ? (
        // ❌ Remove from watchlist button
        <div
          onClick={() => handleRemoveFromWatchList(movieObj)} // ✅ Trigger removal function
          className="rounded-lg m-2 bg-gray-900/60 h-8 w-8 flex justify-center items-center hover:cursor-pointer"
        >
          &#10060; {/* ❌ Cross emoji (remove) */}
        </div>
      ) : (
        // ❤️ Add to watchlist button
        <div
          onClick={() => handleAddToWatchList(movieObj)} // ✅ Trigger add function
          className="rounded-lg m-2 bg-gray-900/60 h-8 w-8 flex justify-center items-center hover:cursor-pointer"
        >
          &#128525; {/* ❤️ Heart emoji (add) */}
        </div>
      )}

      {/* ✅ Display movie name at the bottom */}
      <div className="w-full text-sm text-center text-white bg-gray-900/70">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
