import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Optional: show page numbers around current page
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full flex items-center justify-center mt-4 relative">
      <nav className="flex space-x-2">
        <button
          className="px-2 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="inline" />
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded ${
              page === currentPage ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => onPageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
        <button
          className="px-2 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="inline" />
        </button>
        <span className="hidden sm:flex px-4 py-2 text-gray-700 absolute right-0">
          Página {currentPage} de {totalPages}
        </span>
      </nav>
    </div>
  );
}
