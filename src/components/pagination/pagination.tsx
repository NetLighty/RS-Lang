import React from 'react';
import PaginationButton from './paginationButton';

function Pagination() {
  return (
    <div className="book__pagination">
      <PaginationButton text="<<" />
      <PaginationButton text="<" />
      <PaginationButton text="1" />
      <PaginationButton text=">" />
      <PaginationButton text=">>" />
    </div>
  );
}

export default Pagination;
