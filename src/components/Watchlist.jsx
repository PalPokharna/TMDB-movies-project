import React, { useEffect, useState } from "react";
import genres from "../Utilities/genres";

function Watchlist({ watchList, setWatchList, handleRemoveFromWatchList }) {
  // ✅ State for search input
  let [search, setSearch] = useState("");

  // ✅ State for genre list and current selected genre
  const [genreList, setGenreList] = useState(["All Genres"]);
  const [currentGenre, setCurrentGenre] = useState("All Genre");

  // ✅ Handle search input change
  let handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // ✅ Handle genre filter selection
  let handleGenreFilter = (genre) => {
    setCurrentGenre(genre);
  };

  // ✅ Sort movies in ascending order based on vote_average
  let sortAscending = () => {
    let sortedAscending = watchList.sort(
      (movieA, movieB) => movieA.vote_average - movieB.vote_average
    );
    setWatchList([...sortedAscending]); // Create a new array reference to trigger re-render
  };

  // ✅ Sort movies in descending order based on vote_average
  let sortDescending = () => {
    let sortedDescending = watchList.sort(
      (movieA, movieB) => movieB.vote_average - movieA.vote_average
    );
    setWatchList([...sortedDescending]); // Create a new array reference to trigger re-render
  };

  // ✅ Extract unique genres from the movie list when the component mounts or watchList changes
  useEffect(() => {
    let temp = watchList.map((movieObj) => genres[movieObj.genre_ids[0]]);

    // ✅ Remove duplicates and add "All Genre" at the beginning
    let uniqueGenres = ["All Genre", ...new Set(temp)];
    setGenreList(uniqueGenres);
  }, [watchList]);

  return (
    <>
      {/* 🔥 Genre Filter Buttons */}
      <div className="flex justify-center m-4 gap-1.5">
        {genreList.map((genre) => (
          <div
            key={genre} // ✅ Use key for performance optimization
            onClick={() => {
              handleGenreFilter(genre);
            }}
            className={
              currentGenre === genre
                ? "text-white flex justify-center hover:cursor-pointer items-center bg-blue-400 h-[2rem] w-[9rem] rounded-xl font-bold"
                : "text-white flex justify-center hover:cursor-pointer items-center bg-gray-400 h-[2rem] w-[9rem] rounded-xl font-bold"
            }
          >
            {genre}
          </div>
        ))}
      </div>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center my-3">
        <input
          onChange={handleSearchChange} // ✅ Trigger handleSearchChange on input change
          value={search} // ✅ Controlled input
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-300 px-3 rounded-xl"
        />
      </div>

      {/* 🎥 Movie Table */}
      <div className="rounded overflow-hidden border border-gray-900 m-8">
        <table className="text-black text-center w-full p-1">
          <thead className="border-b-2 border border-gray-900 border-r-2">
            <tr>
              <th>Name</th>
              <th>
                <div className="gap-2 flex justify-center">
                  {/* ✅ Sort buttons for ascending and descending */}
                  <div onClick={sortAscending}>
                    <i className="bi bi-arrow-up"></i>
                  </div>
                  <div>Rating</div>
                  <div onClick={sortDescending}>
                    <i className="bi bi-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchList
              .filter((movieObj) => {
                // ✅ Get the genre name from the genre ID
                const genreName = genres[movieObj.genre_ids[0]];

                // ✅ Search filter (case-insensitive)
                const matchesSearch = movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());

                // ✅ Genre filter
                const matchesGenre =
                  currentGenre === "All Genre" || genreName === currentGenre;

                // ✅ Return true only if both filters match
                return matchesGenre && matchesSearch;
              })
              .map((movieObj) => (
                <tr key={movieObj.id} className="border border-gray-900">
                  <td className="flex items-center px-6 py-3">
                    {/* ✅ Display movie poster */}
                    <img
                      className="h-[6rem] w-[10rem]"
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      alt={movieObj.title}
                    />
                    <div className="mx-20 flex justify-center text-center">
                      {movieObj.title}
                    </div>
                  </td>
                  <td>{movieObj.vote_average}</td>
                  <td>{movieObj.popularity}</td>

                  {/* ✅ Display genre or fallback to 'Unknown Genre' if not found */}
                  <td>{genres[movieObj.genre_ids[0]] || "Unknown Genre"}</td>
                  <td
                    onClick={() => {
                      handleRemoveFromWatchList(movieObj);
                    }}
                    className="text-red-600 hover:cursor-pointer"
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
