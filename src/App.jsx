import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";

function App() {
  // ✅ State to store the watchlist
  let [watchList, setWatchList] = useState([]);

  // ✅ Function to add a movie to the watchlist
  let handleAddToWatchList = (movieObj) => {
    let newWatchList = [...watchList, movieObj]; // Add the new movie
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList)); // Save to localStorage
    setWatchList(newWatchList); // Update state
    console.log(newWatchList);
  };

  // ✅ Function to remove a movie from the watchlist
  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchList.filter((movie) => {
      return movie.id !== movieObj.id; // Remove movie by ID
    });
    setWatchList(filteredWatchList); // Update state with filtered list
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchList)); // Save updated list
  };

  // ✅ Load watchlist from localStorage on initial render
  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");

    if (moviesFromLocalStorage) {
      setWatchList(JSON.parse(moviesFromLocalStorage)); // Load movies into state
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* ✅ Route for the home page */}
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  watchList={watchList}
                  handleRemoveFromWatchList={handleRemoveFromWatchList}
                  handleAddToWatchList={handleAddToWatchList}
                />
              </>
            }
          />

          {/* ✅ Route for the watchlist page */}
          <Route
            path="/watchlist"
            element={
              <Watchlist
                setWatchList={setWatchList}
                watchList={watchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
