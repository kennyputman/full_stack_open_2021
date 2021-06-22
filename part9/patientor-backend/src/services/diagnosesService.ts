import diagnosesData from "../../data/diagnoses";

import { Diagnose } from "../types/diagnosesTypes";

const getDiagnoses = (): Array<Diagnose> => {
  return diagnosesData;
};

export default {
  getDiagnoses,
};
