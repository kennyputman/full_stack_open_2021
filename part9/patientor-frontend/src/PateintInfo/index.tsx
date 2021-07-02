import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Entry, Patient } from "../types";
import EntryDetails from "./EntryDetails";
import Loading from "./Loading";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [showSpinner, SetShowSpinner] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer = setTimeout(() => SetShowSpinner(true), 500);

    return () => clearTimeout(timer);
  });

  React.useEffect(() => {
    if (patient === undefined || patient.id !== id) {
      void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

      const fetchPatient = async () => {
        try {
          const { data: patient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(setPatient(patient));
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatient();
    }
  }, [dispatch]);

  let gender: "mars" | "venus" | "genderless";

  switch (patient?.gender) {
    case "male":
      gender = "mars";
      break;
    case "female":
      gender = "venus";
      break;
    default:
      gender = "genderless";
      break;
  }

  if (patient === undefined || patient.id !== id) {
    return <Loading showSpinner={showSpinner}></Loading>;
  }

  return (
    <Container>
      <h2>
        {patient.name}
        <Icon name={gender}></Icon>
      </h2>

      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h2>Entries</h2>
      <Card.Group>
        {patient.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry}></EntryDetails>
        ))}
      </Card.Group>
    </Container>
  );
};

export default PatientInfoPage;
