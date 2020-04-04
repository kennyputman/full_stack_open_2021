import React from "react";

const Filter = (countriesFilter, handleCountriesFilter) => {
  console.log(countriesFilter);
  return (
    <div>
      find countries{" "}
      <input value={countriesFilter} onChange={handleCountriesFilter} />
    </div>
  );
};

export default Filter;
