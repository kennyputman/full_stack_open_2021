"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const newPatientValidator_1 = __importDefault(require("../utils/newPatientValidator"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.json(patientService_1.default.getNonSensitivePatients());
});
router.post("/", (req, res) => {
    try {
        const validatedPatient = newPatientValidator_1.default(req.body);
        const newPatient = patientService_1.default.addPatient(validatedPatient);
        res.json(newPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
