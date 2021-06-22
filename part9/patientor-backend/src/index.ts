import express from "express";
import cors from "cors";
import morgan from "morgan";

import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
