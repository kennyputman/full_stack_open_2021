import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

const PORT = 3002;

app.get("/hello", (_req, res) => {
  res.send("Hello full stack!");
});

app.get("/bmi", (req, res) => {
  const info = req.query;

  if (!info.height || !info.weight) {
    return res.status(400).json({ error: "please include height and weight" });
  }

  if (isNaN(Number(info.height)) || isNaN(Number(info.weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmi(Number(info.height), Number(info.weight));

  const result = {
    weight: Number(info.weight),
    height: Number(info.height),
    bmi: bmi,
  };
  return res.json(result);
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }

  if (isNaN(Number(target))) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  if (daily_exercises.every((n) => isNaN(Number(n)))) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const result = calculateExercises({
    target: target,
    daily_exercises: daily_exercises,
  });
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */

  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
