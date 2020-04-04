import React from "react";
import Country from "./Country";

const CountriesList = ({ countries, countriesFilter }) => {
  const matches = countries.filter((country) =>
    country.name.toLowerCase().includes(countriesFilter.toLowerCase())
  );

  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <ul>
        {matches.map((country) => (
          <Country key={country.alpha3Code} country={country} />
        ))}
      </ul>
    );
  }
};

export default CountriesList;
