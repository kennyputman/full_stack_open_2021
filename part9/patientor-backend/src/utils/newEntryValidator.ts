import { Diagnosis } from "../types/diagnosesTypes";
import {
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
} from "../types/patientTypes";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("incorrect or missing description");
  }

  return description;
};

const parseString = (str: unknown, description: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`incorrect or missing ${description}`);
  }

  return str;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis["code"]> => {
  if (!codes) {
    return [];
  }

  if (!Array.isArray(codes)) {
    throw new Error("Codes incorrectly formatted: not in array format");
  }

  try {
    codes.forEach((code: unknown) => {
      if (!isString(code)) {
        throw new Error("Incorrect code format");
      }
    });

    return codes as Array<Diagnosis["code"]>;
  } catch (error) {
    throw new Error(error.message);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isRating(rating)) {
    throw new Error("Incorrect or missing rating: " + rating);
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const newEntryValidator = (entry: any): NewEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
  };

  if (!entry.type || !isString(entry.type)) {
    throw new Error("Missing type");
  }

  switch (entry.type) {
    case "Hospital":
      if (!entry.discharge) {
        throw new Error("missing discharge");
      }
      return {
        ...newBaseEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(entry.discharge.date),
          criteria: parseString(entry.discharge.criteria, "criteria"),
        },
      };

    case "OccupationalHealthcare":
      if (!entry.sickLeave) {
        return {
          ...newBaseEntry,
          type: "OccupationalHealthcare",
          employerName: parseString(entry.employerName, "Employer Name"),
        };
      }

      let sickLeave;
      if (entry.sickLeave.startDate && entry.sickLeave.endDate) {
        sickLeave = {
          startDate: parseDate(entry.sickLeave.startDate),
          endDate: parseDate(entry.sickLeave.endDate),
        };
      }
      return {
        ...newBaseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString(entry.employerName, "Employer Name"),
        sickLeave,
      };

    case "HealthCheck":
      return {
        ...newBaseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    default:
      throw new Error("Incorrect type");
  }
};

export default newEntryValidator;
