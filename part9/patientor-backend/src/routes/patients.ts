import express from "express";
import patientService from "../services/patientService";
import newPatientValidator from "../utils/newPatientValidator";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const validatedPatient = newPatientValidator(req.body);

    const newPatient = patientService.addPatient(validatedPatient);

    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
