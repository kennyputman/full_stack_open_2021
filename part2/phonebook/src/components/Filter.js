import React from "react";

const Filter = (newNameFilter, handleNameFilterChange) => {
  return (
    <div>
      Filter shown with
      <input value={newNameFilter} onChange={handleNameFilterChange} />
    </div>
  );
};

export default Filter;
