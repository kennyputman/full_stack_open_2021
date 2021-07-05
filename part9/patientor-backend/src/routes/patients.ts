import express from "express";
import patientService from "../services/patientService";
import newEntryValidator from "../utils/newEntryValidator";
import newPatientValidator from "../utils/newPatientValidator";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getPublicPatient());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatientById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
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

router.post("/:id/entries", (req, res) => {
  try {
    console.log(req.body);
    const newEntry = newEntryValidator(req.body);
    const patientId = req.params.id;
    console.log(newEntry);
    const entry = patientService.addPatientEntry(newEntry, patientId);
    res.json(entry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
