import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Patient } from "../types";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
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
    return <div>...loading</div>;
  }

  console.log(patient);

  return (
    <Container>
      <h2>
        {patient.name}
        <Icon name={gender}></Icon>
      </h2>

      <p>ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </Container>
  );
};

export default PatientInfoPage;
