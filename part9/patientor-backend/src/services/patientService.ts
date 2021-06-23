import { patientData } from "../../data/patients";
import {
  NewPatient,
  NonSensitivePatients,
  Patient,
} from "../types/patientTypes";
import { v4 as uuidv4 } from "uuid";

const patients: Array<Patient> = patientData;

const getNonSensitivePatients = (): NonSensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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
  getNonSensitivePatients,
  addPatient,
};
