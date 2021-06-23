import { patients } from "../../data/patients";
import { Patient } from "../types/patientTypes";
import { v4 as uuidv4 } from "uuid";

const getNonSensitivePatients = (): Omit<Patient, "ssn">[] => {
  return patients;
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): Patient => {
  const newPatient = {
    id: uuidv4(),
    name: name,
    dateOfBirth: dateOfBirth,
    ssn: ssn,
    gender: gender,
    occupation: occupation,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient,
};
