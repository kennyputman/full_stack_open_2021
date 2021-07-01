import diagnoses from "../../data/diagnoses";

import { Diagnosis } from "../types/diagnosesTypes";

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
