import React from 'react';
import { Link } from 'react-router-dom';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(currentPage - 1);
          }}
          className="page-link prev"
        >
          &laquo; 上一页
        </Link>
      )}
      
      {getPageNumbers().map(page => (
        <Link
          key={page}
          to="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(page);
          }}
          className={`page-link ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </Link>
      ))}
      
      {currentPage < totalPages && (
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(currentPage + 1);
          }}
          className="page-link next"
        >
          下一页 &raquo;
        </Link>
      )}
    </div>
  );
}

export default Pagination;