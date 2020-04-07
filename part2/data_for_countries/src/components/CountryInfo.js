import React from "react";
import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  return (
    <>
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <h3>Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.iso639_2}>{language.name}</li>
          ))}
        </ul>

        <div>
          <img
            src={country.flag}
            alt="Country Flag"
            width={120}
            height={80}
            mode="fit"
          ></img>
        </div>
      </div>
      <Weather city={country.capital} />
    </>
  );
};

export default CountryInfo;
