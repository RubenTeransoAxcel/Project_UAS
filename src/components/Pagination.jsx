export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onPageSizeChange,
}) {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const middlePages = [currentPage, currentPage + 1];

      if (currentPage <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", ...middlePages, "...", totalPages);
      }
    }

    return pages;
  };

  const renderButton = (page) => {
    if (page === "...") {
      return (
        <span
          key={Math.random()}
          className="w-8 h-8 flex items-center justify-center text-gray-400"
        >
          ...
        </span>
      );
    }

    return (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm font-medium ${
          currentPage === page
            ? "border-blue-500 text-blue-500"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        {page}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          &lt;
        </button>

        {/* Pages */}
        {getPageNumbers().map((page) => renderButton(page))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          &gt;
        </button>
      </div>

      {/* Page size */}
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <select
          value={itemsPerPage}
          onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
          className="border rounded-md px-2 py-1 text-sm focus:outline-none"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        /Page
      </div>
    </div>
  );
}
