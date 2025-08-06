import React from 'react';
import { Search } from 'react-bootstrap-icons';

const LibrarySearchCard = () => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column py-4">
      <Search size={40} className="mb-2 text-info" />
      <h6 className="text-light">Search Library</h6>
      <p className="text-secondary small text-center mb-0">Find books, journals, and more</p>
    </div>
  );
};

export default LibrarySearchCard;
