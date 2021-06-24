import { patientData } from "../../data/patients";
import { NewPatient, PublicPatient, Patient } from "../types/patientTypes";
import { v4 as uuidv4 } from "uuid";

const patients: Array<Patient> = patientData;

const getPublicPatient = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => id === patient.id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatient,
  addPatient,
  getPatientById,
};
