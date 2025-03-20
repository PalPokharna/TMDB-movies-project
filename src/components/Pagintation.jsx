import React from "react";

function Pagination({ goToNextPage, goToPreviousPage, pageNo }) {
  return (
    <div className="bg-gray-900/60 text-white flex justify-center p-3 mt-8">
      {/* ✅ Previous Page Button */}
      <div
        className="px-8 hover:cursor-pointer hover:scale-120 duration-200 font-bold"
        onClick={goToPreviousPage} // ✅ Trigger previous page function
      >
        <i className="bi bi-arrow-left"></i>
      </div>

      {/* ✅ Current Page Number */}
      <div className="font-bold">{pageNo}</div>

      {/* ✅ Next Page Button */}
      <div
        className="px-8 hover:cursor-pointer hover:scale-120 duration-200 font-bold"
        onClick={goToNextPage} // ✅ Trigger next page function
      >
        <i className="bi bi-arrow-right"></i>
      </div>
    </div>
  );
}

export default Pagination;
