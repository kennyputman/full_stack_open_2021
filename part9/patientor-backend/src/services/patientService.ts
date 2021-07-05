import { patientData } from "../../data/patients";
import {
  NewPatient,
  PublicPatient,
  Patient,
  Entry,
  NewEntry,
} from "../types/patientTypes";
import { v4 as uuidv4 } from "uuid";

let patients: Array<Patient> = patientData;

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

const addPatientEntry = (newEntry: NewEntry, patientId: string): Entry => {
  const updatedPatient: Patient | undefined = patients.find(
    (patient) => patient.id === patientId
  );

  const entry: Entry = {
    id: uuidv4(),
    ...newEntry,
  };

  if (!updatedPatient) {
    throw new Error("Patient not found");
  }

  patients = patients.map((patient) => {
    if (patient.id === patientId) {
      patient.entries.push(entry);
      return patient;
    } else {
      return patient;
    }
  });

  return entry;
};

export default {
  getPublicPatient,
  addPatient,
  getPatientById,
  addPatientEntry,
};
