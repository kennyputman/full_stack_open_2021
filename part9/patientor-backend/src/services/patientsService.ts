import { patients } from "../../data/patients";
import { Patient } from "../types/patientTypes";

const getNonSensitivePatients = (): Omit<Patient, "ssn">[] => {
  return patients;
};

export default {
  getNonSensitivePatients,
};
