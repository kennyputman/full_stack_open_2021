"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = require("../../data/patients");
const uuid_1 = require("uuid");
const patients = patients_1.patientData;
const getNonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v4() }, patient);
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    getNonSensitivePatients,
    addPatient,
};
