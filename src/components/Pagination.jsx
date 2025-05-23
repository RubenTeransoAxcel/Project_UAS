import React from "react";

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md font-medium ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-coklat text-white hover:bg-coklat2 cursor-pointer"
        }`}
      >
        Previous  
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md font-medium ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-coklat text-white hover:bg-coklat2 cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
}
