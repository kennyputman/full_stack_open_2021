import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import CountriesList from "./components/CountriesList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  console.log("render", countries.length, "countries");

  const handleCountriesFilter = (event) => {
    setCountriesFilter(event.target.value);
  };

  return (
    <div>
      {Filter(countriesFilter, handleCountriesFilter)}
      <CountriesList
        countries={countries}
        countriesFilter={countriesFilter}
        handleCountriesFilter={handleCountriesFilter}
      />
    </div>
  );
};

export default App;
