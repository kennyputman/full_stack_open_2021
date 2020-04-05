import React from "react";
import Country from "./Country";
import CountryInfo from "./CountryInfo";

const CountriesList = ({
  countries,
  countriesFilter,
  handleCountriesFilter,
}) => {
  const matches = countries.filter((country) =>
    country.name.toLowerCase().includes(countriesFilter.toLowerCase())
  );

  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (matches.length === 1) {
    return <CountryInfo country={matches[0]} />;
  } else {
    return (
      <ul>
        {matches.map((country) => (
          <Country
            key={country.alpha3Code}
            country={country}
            handleCountriesFilter={handleCountriesFilter}
          />
        ))}
      </ul>
    );
  }
};

export default CountriesList;
