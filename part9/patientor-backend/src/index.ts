import express from "express";
import cors from "cors";
import morgan from "morgan";

import diagnosesRouter from "./routes/diagnoses";

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
