import axios, { AxiosResponse } from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Container, Icon, Select } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { apiBaseUrl } from "../constants";
import { addPatientEntry, setPatient, useStateValue } from "../state";
import { Entry, EntryFormValues, Patient } from "../types";
import EntryDetails from "./EntryDetails";
import Loading from "./Loading";

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [showSpinner, SetShowSpinner] = React.useState<boolean>(false);
  const [entryType, setEntryType] = React.useState<string>("Hospital");

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: newEntry } = await axios.post<
        EntryFormValues,
        AxiosResponse<Entry>
      >(`${apiBaseUrl}/patients/${id}/entries`, values);
      console.log(newEntry);

      dispatch(addPatientEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

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

  const entryOptions = [
    { key: "HealthCheck", value: "HealthCheck", text: "HealthCheck" },
    { key: "Hospital", value: "Hospital", text: "Hospital" },
    {
      key: "OccupationalHealthcare",
      value: "OccupationalHealthcare",
      text: "OccupationalHealthcare",
    },
  ];

  const entryTypeHandler = (
    event: React.SyntheticEvent<HTMLElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  ) => {
    setEntryType(data.value);
  };

  if (patient === undefined || patient.id !== id) {
    return <Loading showSpinner={showSpinner}></Loading>;
  }

  return (
    <div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        entryType={entryType}
      />
      <Select
        label="Entry Type"
        placeholder="Select an Entry Type"
        options={entryOptions}
        onChange={entryTypeHandler}
      ></Select>
      <Button onClick={() => openModal()}>Add New Entry</Button>
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
    </div>
  );
};

export default PatientInfoPage;
