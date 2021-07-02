import React from "react";
import { Entry } from "../types";
import HealthCheckDetails from "./HealthCheckEntry";
import HospitalDetails from "./HospitalDetails";
import OccupationalHealthcareDetails from "./OccupationalHealthcareDetails";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalDetails entry={entry}></HospitalDetails>;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry}></HealthCheckDetails>;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareDetails
          entry={entry}
        ></OccupationalHealthcareDetails>
      );
    default:
      return <div>Whoops!</div>;
  }
};

export default EntryDetails;
