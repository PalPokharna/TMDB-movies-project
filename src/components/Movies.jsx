import React, { useEffect, useState } from "react";
import MovieCard from "./Moviecard"; // ✅ Import MovieCard component
import axios from "axios"; // ✅ Import axios for API requests
import Pagination from "./Pagintation"; // ✅ Import Pagination component

function Movies({
  handleAddToWatchList,
  handleRemoveFromWatchList,
  watchList,
}) {
  const [movies, setMovies] = useState([]); // ✅ State to store fetched movies
  const [pageNo, setPageNo] = useState(1); // ✅ State for current page number

  // ✅ Fetch popular movies from TMDB API when pageNo changes
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=702b9430ca6606148f3648e6c04d99c1&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results); // ✅ Store fetched movies in state
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [pageNo]); // ✅ Trigger on page number change

  // ✅ Function to move to the next page
  const goToNextPage = () => {
    setPageNo((prev) => prev + 1); // ✅ Increment the page number
  };

  // ✅ Function to move to the previous page (with validation)
  const goToPreviousPage = () => {
    if (pageNo > 1) {
      setPageNo((prev) => prev - 1); // ✅ Decrement the page number
    }
  };

  return (
    <div className="p-3 m-2">
      {/* ✅ Heading */}
      <div className="text-center font-bold text-2xl mb-3">Trending Movies</div>

      {/* ✅ Movie Grid */}
      <div className="flex flex-row justify-around flex-wrap gap-3">
        {movies.map((movieObj) => (
          <MovieCard
            handleAddToWatchList={handleAddToWatchList} // ✅ Pass add function
            key={movieObj.id} // ✅ Use unique key for React optimization
            poster_path={movieObj.poster_path} // ✅ Movie poster path
            name={movieObj.title} // ✅ Movie title
            movieObj={movieObj} // ✅ Full movie object
            handleRemoveFromWatchList={handleRemoveFromWatchList} // ✅ Pass remove function
            watchList={watchList} // ✅ Pass current watchlist
          />
        ))}
      </div>

      {/* ✅ Updated Pagination Component with Correct Prop Names */}
      <Pagination
        goToNextPage={goToNextPage} // ✅ Matching the prop names correctly
        goToPreviousPage={goToPreviousPage}
        pageNo={pageNo}
      />
    </div>
  );
}

export default Movies;
